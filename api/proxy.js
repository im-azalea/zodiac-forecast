export default async function handler(req, res) {
    const { zodiacSign } = req.query;

    if (!zodiacSign) {
        return res.status(400).json({ error: 'Parameter "zodiacSign" diperlukan' });
    }

    const apiUrl = `https://best-daily-astrology-and-horoscope-api.p.rapidapi.com/api/Detailed-Horoscope/?zodiacSign=${zodiacSign}`;

    try {
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json',
                'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,  // Mengambil API Key dari Environment Variables
                'X-RapidAPI-Host': 'best-daily-astrology-and-horoscope-api.p.rapidapi.com'
            }
        });

        if (!response.ok) {
            return res.status(response.status).json({ error: `Error fetching data: ${response.statusText}` });
        }

        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
}
