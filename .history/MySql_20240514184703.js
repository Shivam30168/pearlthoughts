// const mysql = require('mysql2')
// const connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: '1234',
//   database: 'pdbc'
// })

// connection.connect()

// connection.query('SELECT 1 + 1 AS solution', (err, rows, fields) => {
//   if (err) throw err

//   console.log('The solution is: ', rows[0].solution)
// })

// connection.end()
const mysql = require('mysql2');

// Create connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Shivam@123',
  database: 'sqlclass',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Function to execute query
function executeQuery(query, params = []) {
  return new Promise((resolve, reject) => {
    pool.query(query, params, (err, results, fields) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
}

// Create operation
async function createRecord(data) {
  try {
    const query = 'INSERT INTO express (cust_id, cust_name) VALUES (?, ?)';
    const params = ["1", "Shivam"];
    const result = await executeQuery(query, params);
    return result.insertId; // Return the ID of the newly inserted record
  } catch (error) {
    throw error;
  }
}

// Read operation
async function readRecords() {
  try {
    const query = 'SELECT * FROM express';
    const results = await executeQuery(query);
    return results;
  } catch (error) {
    throw error;
  }
}

// Update operation
async function updateRecord(id, newData) {
  try {
    const query = 'UPDATE express SET column1 = ?, column2 = ? WHERE id = ?';
    const params = [newData.column1, newData.column2, id];
    const result = await executeQuery(query, params);
    return result.affectedRows; // Return the number of affected rows
  } catch (error) {
    throw error;
  }
}

// Delete operation
async function deleteRecord(id)
 {
  try {
    const query = 'DELETE FROM express WHERE id = ?';
    const params = [id];
    const result = await executeQuery(query, params);
    return result.affectedRows; // Return the number of affected rows
  } catch (error) {
    throw error;
  }
}

// Usage example
async function main() {
  try {
    // Create a new record
    const newRecordId = await createRecord({ column1: 'value1', column2: 'value2' });
    console.log('New record created with ID:', newRecordId);

    // Read all records
    const allRecords = await readRecords();
    console.log('All records:', allRecords);

    // Update a record
    const updatedRows = await updateRecord(1, { column1: 'new value1', column2: 'new value2' });
    console.log('Number of updated rows:', updatedRows);

    // Delete a record
    const deletedRows = await deleteRecord(1);
    console.log('Number of deleted rows:', deletedRows);
  } catch (error) {
    console.error('Error:', error);
  } finally {
    // End the connection pool
    pool.end();
  }
}

// Call the main function
main();