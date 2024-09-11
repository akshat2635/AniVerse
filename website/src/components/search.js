export default async function handler(req, res) {
    const { q } = req.query;
    const apiRes = await fetch(`https://aniverse-3tlm.onrender.com/get-names?name=${q}`);
    const data = await apiRes.json();
    res.status(200).json(data);
  }