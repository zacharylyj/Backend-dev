app.post('/customers', function (req, res) {

    if (req.body.store_id == null ||
        req.body.first_name == null ||
        req.body.last_name == null ||
        req.body.email == null ||
        req.body.address_line1 == null ||
        req.body.address_line2 == null ||
        req.body.district == null ||
        req.body.city_id == null ||
        req.body.postal_code == null ||
        req.body.phone == null
    ) {
        res.status(400);
        res.type('application/json');
        res.send(`{"error_msg":"missing data"}`);
    }
    address = [req.body.address_line1, req.body.address_line2, req.body.district, req.body.city_id, req.body.postal_code, req.body.phone]
    userDB.addCustomer(
        req.body.store_id,
        req.body.first_name,
        req.body.last_name,
        req.body.email,
        address,
        function (err, results) {
            if (err) {
                res.status(500);
                res.type('application/json');
                res.send(`{"error_msg":"Internal server error"}`);
            }
            else {
                res.status(201);
                res.type('application/json');
                res.send(`{"customer_id": "${results.insertId}"}`)
            }
        });
});