const express = require('express');
const router = express.Router();
const Note = require('../models/Note.js');
const { OnSession} = require('../helpers/auth.js');

router.get('/note', OnSession, async(req, res) => {
	const notes = await Note.find({create_by: req.user.id}).sort({date: 'desc'}).lean();
	res.render('notes/note', { notes });
})

router.get('/note/new', OnSession, (req, res)=>{
	res.render('notes/new')
})

router.get('/note/update/:id', OnSession, async(req, res)=>{
	const {id} = req.params;
	const note = await Note.findById(id).lean();
	res.render('notes/update.hbs', { note });
})

router.post('/note/new', OnSession, async(req, res)=>{
	const {title, description} = req.body;

	if(!title) {
		req.flash('err', 'Debes agregar un titulo.');
		res.redirect('/note');
	}
	if(!description) {
		req.flash('err', 'Debes agregar una descripción.');
		res.redirect('/note');
	}
	else{
		const NewNote = new Note({title,description});
		NewNote.create_by = req.user.id;
		await NewNote.save();
		req.flash('succ', 'Nota Creada Exitosamente.')
		res.redirect('/note');
	}
})

router.put('/note/update/:id', OnSession, async(req, res) => {
	const {title, description} = req.body;
	await Note.findByIdAndUpdate(req.params.id, {title, description});
	req.flash('succ', 'Nota Editada Exitosamente.');
	res.redirect('/note');
})

router.delete('/note/delete/:id', OnSession, async (req, res) => {
	await Note.findByIdAndDelete(req.params.id);
	req.flash('succ', 'Nota Eliminada.');
	res.redirect('/note');
})

module.exports = router;
