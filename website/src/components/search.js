export default async function handler(req, res) {
    const { q } = req.query;
    const apiRes = await fetch(`http://127.0.0.1:5000/get-names?name=${q}`);
    const data = await apiRes.json();
    res.status(200).json(data);
  }