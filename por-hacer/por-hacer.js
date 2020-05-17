const fs = require('fs');

let listadoPorHacer = [];

const guardarDB = () => {
    let data = JSON.stringify(listadoPorHacer);
    fs.writeFile('db/data.json', data, e => {
        if (e) throw new Error('No se pudo grabar', e)
    });
};

const cargarDB = () => {
    try {
        listadoPorHacer = require('../db/data.json');
    } catch (error) {
        listadoPorHacer = [];
    }
}

const crear = (descripcion) => {

    cargarDB();

    let porHacer = {
        descripcion,
        completado: false
    }

    listadoPorHacer.push(porHacer);

    guardarDB();

    return porHacer;
}

const getListado = () => {
    cargarDB();
    return listadoPorHacer;
}

const actualizar = (descripcion, completado) => {
    let result = false;
    cargarDB();
    listadoPorHacer.forEach(task => {
        if (task.descripcion === descripcion) {
            task.completado = completado;
            guardarDB();
            result = true;
        }
    })
    return result;
}

const borrar = (descripcion) => {
    cargarDB();
    let nuevoListado = listadoPorHacer.filter(task => task.descripcion !== descripcion);
    let result = (nuevoListado.length < listadoPorHacer.length) ? true : false;
    listadoPorHacer = nuevoListado;
    guardarDB();
    return result;
}

module.exports = {  
    crear,
    getListado,
    actualizar,
    borrar
}