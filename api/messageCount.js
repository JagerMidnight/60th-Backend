// This API is used to collect anonymized Analytics and user data. Such as how many "Contact Us" messages got sent.
// More information at https://www.60thwpg.com

const { Database } = require('sqlite3');

const db = new Database(':memory:'); // Using an in-memory database for simplicity
db.serialize(() => {
  db.run('CREATE TABLE IF NOT EXISTS messages (id INTEGER PRIMARY KEY, count INTEGER)');
  
  db.get('SELECT count FROM messages WHERE id = 1', (err, row) => {
    if (!row) {
      db.run('INSERT INTO messages (id, count) VALUES (1, 0)');
    }
  });
});

module.exports = async (req, res) => {
  if (req.method === 'GET') {
    // Handle the GET request to retrieve the message count
    db.get('SELECT count FROM messages WHERE id = 1', (err, row) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(200).json({ messageCount: row.count });
    });
  } else if (req.method === 'POST') {
    // Handle the POST request to increment the message count
    db.run('UPDATE messages SET count = count + 1 WHERE id = 1', function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(200).json({ success: true, message: 'Message count incremented' });
    });
  } else {
    // Handle unsupported HTTP methods
    res.status(405).json({ error: 'Method not allowed' });
  }
};
