from flask import Flask,jsonify,request
from flask_cors import CORS
import pandas as pd 
import numpy as np
########################################### Preprocessing #############################################################

content_df=pd.read_csv('./data/content_based_data.csv',index_col='anime_id')

content_df.fillna("unknown",inplace=True)
content_df['tags']=(content_df['genres']+content_df['themes']+content_df['demographics']).apply(lambda x:x.replace('unknown','')).apply(lambda x:x.split(' ')).apply(lambda x:list(filter(lambda i:len(i)>0,x)))
cf_index=pd.read_csv('./data/cf_index.csv',index_col=0)
pop_anime=list(cf_index['anime_id'])

cosine_sim_combined=np.load('./data/content_sim_compressed.npz')['array']

# collaborative similarity
cf_similarity=np.load('./data/cf_sim_compressed.npz')['array']

########################################## Global User VSariables #######################################################
user_watched=[]
####################################### helper functions ###############################################################

def combine_dictionaries(dict1, dict2):
    combined_dict = {}
    all_keys = set(dict1.keys()).union(set(dict2.keys()))
    
    for key in all_keys:
        combined_dict[key] = dict1.get(key, 0) + dict2.get(key, 0)
        
    sorted_dict = dict(sorted(combined_dict.items(), key=lambda item: item[1], reverse=True))
    return sorted_dict

def multiply_dict_values(d, multiplier):
    return {key: value * multiplier for key, value in d.items()}

def scale_dict_values(d, min_range=0.2, max_range=0.8):
    min_val = min(d.values())
    max_val = max(d.values())
    
    # Handle case where all values are the same to avoid division by zero
    if min_val == max_val:
        return {k: (min_range + max_range) / 2 for k in d}
    
    scaled_dict = {
        k: min_range + (v - min_val) * (max_range - min_range) / (max_val - min_val)
        for k, v in d.items()
    }
    
    return scaled_dict

def cvt_df_dict(df):
    cols=df.columns
    ar=np.array(df)
    ans=[]
    for i in ar:
        cur={}
        for j in range(len(cols)):
            cur[cols[j]]=i[j]
        ans.append(cur)
    return ans

def find_anime_id(name):
    name=name.lower()
    temp=[i for i,s in enumerate(content_df['title']) if name in s.lower()]
    list1=content_df.iloc[temp]
    list1['score']=list1['score'].astype(float)
    a_id=list1.sort_values(by='score',ascending=False).index
    if (len(a_id)>0):
       return a_id[0] 
    else:
        return -1
    
def find_tag(tag):
    res=content_df[content_df['tags'].apply(lambda x: tag in x)].sort_values(by='popularity',ascending=True)
    # res=res.head(n)
    res=res.reset_index()
    res=res.to_dict(orient='records')
    return  res


def related_names(name):
    name=name.lower()
    subs=name.split(" ")
    print(name)
    fset={}
    for sub in subs:
        temp=[i for i,s in enumerate(content_df['title']) if sub in s.lower()]
        if(len(fset)==0):
            fset=set(temp)
        else:
            fset=fset.intersection(set(temp))
    temp=list(fset)
    list1=content_df.iloc[temp]
    list1['scored_by']=list1['scored_by'].astype(float)
    r_names=list1.sort_values(by='scored_by',ascending=False)['title'].to_dict()
    return r_names
    
####################################### Recommender Functions #########################################################

def content_recommendation(a_id,alpha=1,n=25):
    ind=np.argwhere(content_df.index==a_id).reshape(-1)[0]
    
    recom=np.flip(cosine_sim_combined[ind].argsort())[1:1+n]
    sim=cosine_sim_combined[ind][recom]
    
    names=content_df.iloc[recom]['title']
    ra_id=names.index
    sim_score={ra_id[i]:sim[i]*alpha for i in range(len(sim))}
    
    return sim_score

def cf_recommendation(a_id,alpha=1,n=25):
    ind=cf_index[cf_index['anime_id']==a_id].index[0]
    
    recom=np.flip(cf_similarity[ind].argsort())[1:1+n]
    sim=cf_similarity[ind][recom]

    ra_id=list(cf_index.iloc[recom]['anime_id'])

    sim_score={ra_id[i]:sim[i]*alpha for i in range(len(ra_id))}
    return sim_score 

def hybrid_recommendation(a_id,n=20,filter=1,alpha=0.4):
    
    global user_watched
    if(a_id in pop_anime):
        cf_scores=cf_recommendation(a_id,alpha,4*n)
    else:
        cf_scores={}
    # print(user_watched)
    content_scores=content_recommendation(a_id,1-alpha,4*n)
    hybrid_scores=combine_dictionaries(cf_scores,content_scores)
    hybrid_scores={key:val for key,val in hybrid_scores.items() if( content_df.loc[key]['type'] not in ['Special','TV Special','OVA','PV']) and len(content_df.loc[key]['synopsis'])>80}
    if filter==1:
        hybrid_scores={key:val for key,val in hybrid_scores.items() if key not in user_watched}
    
    return dict(list(hybrid_scores.items())[:n])

def user_recommendation(user_ratings,n=30,alpha=0.4):
    overall_score={}
    for a_id in user_ratings:
        rate=user_ratings[a_id]/10
        hybrid_score=hybrid_recommendation(a_id,n,1,alpha)
        hybrid_score=scale_dict_values(hybrid_score)
        hybrid_score=multiply_dict_values(hybrid_score,rate)
        overall_score=combine_dictionaries(overall_score,hybrid_score)
       
    overall_score=dict(list(overall_score.items())[:n])
   
    return overall_score


####################################### flask endpoints #######################################################


app = Flask(__name__)
CORS(app)
@app.route("/get-info/<int:id>",methods=['GET'])
def get_info(id):
    if(id not in content_df.index):
        return jsonify({'error':'Invalid anime id'}), 400
    try:    
        df=content_df.loc[[id]]

        r_dict=cvt_df_dict(df.reset_index())
        
        return jsonify({"status":"found","data":r_dict})
    except:
        return jsonify({"status":"not found"}), 400
    
@app.route("/tag/<string:tag>", methods=['GET'])
def get_tags(tag):
    try:
        r_dict = find_tag(tag)
        print(tag)

        if len(r_dict) == 0:
            raise ValueError("r_dict is empty.")

        return jsonify({"status": "found", "data": r_dict})

    except ValueError as ve:
        # Handle the specific case where r_dict is empty
        return jsonify({"status": "not found", "error": str(ve)}), 404
    
    except Exception as e:
        # Handle all other generic exceptions
        return jsonify({"status": "error", "message": "An unexpected error occurred", "error": str(e)}), 500

@app.route("/get-info",methods=['POST'])
def get_info_post():
    rat = request.get_json()
    try:    
        ids = rat["id"]
        # print(ratings)
        # user_rat={int(key):value for key,value in ratings.items()}
        df=content_df.loc[ids]

        r_dict=cvt_df_dict(df.reset_index())
        
        return jsonify({"status":"found","data":r_dict})
    except:
        return jsonify({"status":"not found"}), 400

@app.route("/get-names",methods=['GET'])
def get_names():
    name = request.args.get('name', default=None, type=str)
    try:    
        r_names=related_names(name)
        return jsonify({"status":"found","related":r_names})
    except:
        return jsonify({"status":"not found"}), 400
    
@app.route('/submit-ratings', methods=['POST'])
def submit_ratings():
    global user_watched
    if not request.is_json:
        return jsonify({"error": "Request must be JSON"}, 400)

    data = request.get_json()

    try:
        ratings = data["ratings"]
        # print(ratings)
        user_rat={int(key):value for key,value in ratings.items()}
        user_watched=list(user_rat.keys())
        scores=user_recommendation(user_rat,n=40)
        rid=list(scores.keys())
        r_df=content_df.loc[rid]
        r_dict=cvt_df_dict(r_df.reset_index())
        
        return jsonify({"message": "Ratings received", "received_ratings": ratings,"recommended":r_dict}), 200
    except KeyError:
        return jsonify({"error": "Invalid data format"}), 400


@app.route('/popular', methods=['GET'])
def popular():
    # id = request.args.get('id', default=None, type=int)
    n = request.args.get('n', default=10, type=int)
    filter = request.args.get('filter', default=0, type=int)
    
    try:    
        sorted_df=content_df.sort_values('popularity')
        r_df=sorted_df.iloc[:n]
        r_dict=cvt_df_dict(r_df.reset_index())
        
        return jsonify({"status":"success","data":r_dict})
    except:
        return jsonify({"status":"not found"}), 400
    
@app.route('/top', methods=['GET'])
def top():
    # id = request.args.get('id', default=None, type=int)
    n = request.args.get('n', default=10, type=int)
    filter = request.args.get('filter', default=0, type=int)
    
    try:    
        sorted_df=content_df.copy()
        # sorted_df['rank'].replace(" ",10000,inplace=True)
        sorted_df=sorted_df.sort_values('rank')
        # sorted_df=sorted_df[sorted_df['rank']!=" "]
        r_df=sorted_df.iloc[:n]
        r_dict=cvt_df_dict(r_df.reset_index())
        
        return jsonify({"status":"success","data":r_dict})
    except:
        return jsonify({"status":"not found"}), 400
    
@app.route('/viewed', methods=['GET'])
def viewed():
    # id = request.args.get('id', default=None, type=int)
    n = request.args.get('n', default=10, type=int)
    filter = request.args.get('filter', default=0, type=int)
    
    try:    
        sorted_df=content_df.copy()
        sorted_df['scored_by']=sorted_df['scored_by'].astype(int)
        sorted_df=sorted_df.sort_values('scored_by',ascending=False)
        r_df=sorted_df.iloc[:n]
        r_dict=cvt_df_dict(r_df.reset_index())
        
        return jsonify({"status":"success","data":r_dict})
    except:
        return jsonify({"status":"not found"}), 400
    
@app.route('/favorite', methods=['GET'])
def favorite():
    # id = request.args.get('id', default=None, type=int)
    n = request.args.get('n', default=10, type=int)
    filter = request.args.get('filter', default=0, type=int)
    
    try:    
        sorted_df=content_df.copy()
        sorted_df['favorites']=sorted_df['favorites'].astype(int)
        sorted_df=sorted_df.sort_values('favorites',ascending=False)
        r_df=sorted_df.iloc[:n]
        r_dict=cvt_df_dict(r_df.reset_index())
        
        return jsonify({"status":"success","data":r_dict})
    except:
        return jsonify({"status":"not found"}), 400
    
@app.route('/recommend', methods=['GET'])
def recommend():
    id = request.args.get('id', default=None, type=int)
    n = request.args.get('n', default=10, type=int)
    filter = request.args.get('filter', default=0, type=int)
    
    if(id not in content_df.index):
        return jsonify({'error':'Invalid anime id'}), 400
    try:    
        scores=hybrid_recommendation(id,n,filter)
        rid=list(scores.keys())
        r_df=content_df.loc[rid]
        if(filter):
            r_df.sort_values(by='popularity',ascending=True,inplace=True)
        r_dict=cvt_df_dict(r_df.reset_index())
        
        return jsonify({"status":"found","data":r_dict})
    except:
        return jsonify({"status":"not found"}), 400

@app.route('/recommend-name', methods=['GET'])
def recommend_name():
    name = request.args.get('name', default=None, type=str)
    n = request.args.get('n', default=10, type=int)
    filter = request.args.get('filter', default=0, type=int)
    
    id=find_anime_id(name)
    if(id not in content_df.index):
        return jsonify({'error':'anime not found'}), 400
    
    try:    
        scores=hybrid_recommendation(id,n,filter)
        rid=list(scores.keys())
        r_df=content_df.loc[rid]
        r_dict=cvt_df_dict(r_df.reset_index())
        
        return jsonify({"status":"found","data":r_dict})
    except:
        return jsonify({"status":"not found"}), 400

if __name__ == '__main__':
    app.run()