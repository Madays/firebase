const { Router } = require('express');
const {db} = require('../firebase');

const router = Router();

router.get('/', async (req, res) => {
    const querySnapshot = await db.collection('contacts').get()
    const contacts = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }))
    console.log(contacts)
    res.render('index')
})

router.post('/new-contact', async (req, res) => {
    const { firstname, lastname, email, phone } = req.body
    await db.collection('contacts').add({
        firstname,
        lastname,
        email,
        phone
    })
    res.send('new contact created')
})

router.get('/edit-contact/:id', async(req, res) => {
    console.log(req.params.id);
    const doc = await db.collection('contacts').doc(req.params.id).get()
    console.log({
        id: doc.id,
        ...doc.data()
    });
    res.send('edit contact')
})

router.get('/delete-contact/:id', async (req, res) => {
    await db.collection('contacts').doc(req.params.id).delete()
    res.send('contact deleted')
})

router.post('/update-contact/:id', async (req, res) => {
    const {id} = req.params
    await db.collection('contacts').doc(id).update(req.body)

    res.send('contact updated')
})
module.exports = router;