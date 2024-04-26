const pool = require('../db/dbConfig')

exports.Homepage = (req, res) => {
  res.send("<h1>This is a CRUD Application</h1>");
};

exports.Customerpage = async (req, res) => {
  try {

    const query = 'SELECT * FROM customer'
    const customerData = await pool.query(query);
    console.log("Get data", customerData.rows)
    res.status(200).send(customerData.rows);
  } catch (error) {
    console.log("Customer Retrival Error", error.message)
  }
};

exports.Addpage = async (req, res) => {
  try {
    const {firstname, lastname, email, textarea, gender} = req.body;
    const query = 'INSERT INTO customer(firstname, lastname, email, textarea, gender) VALUES($1, $2, $3, $4, $5) RETURNING *'
    const user = pool.query(query, [firstname, lastname, email, textarea, gender])
    console.log("USER", user.rows)
    res.status(201).json({ msg: "Done puttarr" });
  } catch (error) {
    console.log("Add Section Error", error.message)
  }
};

exports.editDetails = async (req, res) =>{
  try {
    const id = req.params.id;
    const query = 'SELECT * FROM customer WHERE id = $1'
    const data = await pool.query(query, [id]);
    console.log("data by id", data.rows)
    const user = data.rows[0];
    res.send(user)
  } catch (error) {
    console.log("Node Error Edit Details", error.message)
  }
}

exports.updateDetails = async (req, res) =>{
  try {
    const id = req.params.id;
    console.log("N PARAMS", id)
    const {firstname, lastname, email, textarea, gender} = req.body;
    const query = 'UPDATE customer SET firstname=$1,lastname=$2,email=$3,textarea=$4,gender=$5 WHERE id=$6 RETURNING *'
    const user = pool.query(query, [firstname, lastname, email, textarea, gender, id])
    console.log("USER", user.rows)
    res.status(201).send("ok")
  } catch (error) {
    console.log("Node Error Update Details", error.message)
  }
}

exports.deleteDetails = async (req, res)=>{
  try {
    const id = req.params.id;
    const query = 'DELETE FROM customer WHERE id=$1'
    await pool.query(query, [id])
    console.log('User deleted');
    res.status(200).send("Ok")
  } catch (error) {
    console.log("Delete Section Error", error.message)
  }
}