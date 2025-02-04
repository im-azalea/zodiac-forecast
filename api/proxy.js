export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { sign, day } = req.query;
    if (!sign) {
        return res.status(400).json({ error: 'Parameter "sign" diperlukan' });
    }

    const apiUrl = `https://aztro.sameerkumar.website/?sign=${sign}&day=${day || 'today'}`;

    try {
        const response = await fetch(apiUrl, { method: 'POST' });
        if (!response.ok) {
            return res.status(response.status).json({ error: 'Error fetching data' });
        }
        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}
