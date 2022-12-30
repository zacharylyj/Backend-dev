insertCustomer: (
    store_id,
    first_name,
    last_name,
    email,
    address,
    address2,
    district,
    city_id,
    postal_code,
    phone,
    callback
) => {
    var conn = db.getConnection();
    conn.connect((err) => {
        if (err) {
            console.log(err);
            return callback(err, null);
        } else {
            console.log("Connected");

            let sql = `INSERT INTO address (address, address2, district, city_id, postal_code, phone) VALUES (?,?,?,?,?,?)`;
            conn.query(
                sql,
                [address, address2, district, city_id, postal_code, phone],
                (err, result) => {
                    if (err) {
                        console.log(err);
                        return callback(err, null);
                    }
                    
                    console.log(result);
                    console.log(result.insertId);
                    let sql1 = `INSERT INTO customer (store_id, first_name, last_name, email, address_id) VALUES (?,?,?,?,?)`;
                    let address_id = result.insertId;
                    conn.query(
                        sql1,
                        [store_id, first_name, last_name, email, address_id],
                        (err, result) => {
                            conn.end();
                            if (err) {
                                console.log(err);
                                return callback(err, null);
                            }
                            console.log(result);
                            return callback(null, result);
                        }
                    );
                }
            );
        }
    });
},
