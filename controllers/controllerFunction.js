const { getClient } = require('../db/connect');

var client;

const index = async(req,res) =>{
    res.status(200).json({message:"I am in index"});
}

const addVehicle = async(req,res) =>{
    const {name,validationStatus} = req.body;
    if (!name || !validationStatus) {
        return res.status(400).json({ error: 'name and validationStatus is required in the body parameters.' });
    }
    try{
        const dataToInsert = {
            name: name,
            isValid: validationStatus
        };    
        const query = {
        text: `
            INSERT INTO vehicle (name, isValid)
            VALUES ($1, $2)
            RETURNING *;
        `,
        values: [dataToInsert.name, dataToInsert.isValid],
        };
        client = await getClient(); 
        
        try {
            const result = await client.query(query);
            console.log('Data inserted successfully:', result.rows[0]);
            res.status(200).json({
                message: 'Vehicle Data Stored successfully',
                data: result.rows[0]
            });
        } finally {
            await client.end();
        }
    }catch(error){
        res.status(400).send({ message: error.message });
    }
} 

const vehicleDetail = async(req,res) =>{
    try{
        const query = {
            text: 'SELECT * FROM vehicle;',
            };
            
            client =await getClient(); 

            try {
                const result = await client.query(query);
                console.log('Data Fetched successfully:', result.rows);    
                res.status(200).json({
                    message: 'Data Fetched successfully',
                    data: result.rows
                });
            } finally {
                await client.end();
            }
    }catch(error){
        res.status(400).send({ message: error.message });
    }   
}    

const modifyVehicleDetail = async(req, res) =>{
    const {name, id} = req.body;
    if (!id || !name ) {
        return res.status(400).json({ error: 'name and id is required in the body parameters.' });
    }
    try{
        const query = {
            text: 'UPDATE vehicle SET name = $1 WHERE id = $2;',
            values: [name,id],
            };
        
        client = await getClient(); 
        try {
            const result = await client.query(query);
            console.log('Column updated successfully',result.rowCount);    
            res.status(200).json({
                message: 'Column updated successfully',
                data: result.rowCount
            });
        } finally {
            await client.end();
        }        
    }catch(error){
        res.status(400).send({ message: error.message });
    }    
}

const vehicleDelete = async(req, res) => {
    const {id} = req.body;
    if (!id ) {
        return res.status(400).json({ error: 'name and id is required in the body parameters.' });
    }
    try{
        const query = {
            text: 'DELETE FROM vehicle WHERE id = $1;',
            values: [id],
        };
        client = await getClient(); 
        try {
            const result = await client.query(query);
            console.log('Row deleted successfully',result);    
            res.status(200).json({
                message: 'Row deleted successfully',
                data: result
            });
        } finally {
            await client.end();
        }        
    }
    catch(error){
        res.status(400).send({ message: error.message });
    }
}




module.exports = {
    index,
    addVehicle,
    vehicleDetail,
    modifyVehicleDetail,
    vehicleDelete
};
 
