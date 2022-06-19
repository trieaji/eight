// mengimport terlebih dahulu
const express = require('express') // cara ke 1 
// import express from 'express' -> cara ke 2

const app = express()
// mengimport terlebih dahulu

// menampung port
const port = 8000
// menampung port

//mengirimkan data menggunakan hbs atau set view engine hbs
app.set('view engine', 'hbs')

app.use('/assets', express.static(__dirname + '/assets')) // routing, supaya datanya berjalan dan bisa ditampilkan

app.use(express.urlencoded({extended: false})) // untuk "app.post", menampilkan data ke terminal. Data supaya tampil ke terminal harus mengambil berdasarkan "name" yang ada di hbs. Cara ke 1

/* app.use(express.urlencoded()) */ // untuk "app.post", menampilkan data ke terminal. Data supaya tampil ke terminal harus mengambil berdasarkan "name" yang ada di hbs. Cara ke 2

app.get('/', function(request,response){ //menampilkan data menggunakan hbs
    response.render('index')
})

app.get('/contact', function(request,response){ //menampilkan data menggunakan hbs
    response.render('contact')
})


let isLogin = true
//let dataEdit = []
let dataBlog = [
    {
        Tittle: 'Pasar coding di Indonesia dinilai masih menjanjikan',
        Content: 'Ketimpangan sumber daya manusia (SDM) di sektor digital masih menjadi isu yang belum terpecahkan.',
        Author: 'Bambang',
        postAt: new Date(),
        //isLogin // memanggil "isLogin" supaya bisa melakukan update data atau menambahkan data
    }
] // bersifat HOF

app.get('/blog', function(request,response){ //menampilkan data menggunakan hbs atau memanggil
    //console.log(dataBlog) // bersifat HOF
   
    let file = dataBlog.map((others) => { 
        return { //mengembalikan "dataBlog.map(others)"
            ...others, // mengeluarkan data hasil dari pengembalian return
            //nawa: 'Bambang',
            //Tittle: 'Bootcamp', //merubah isi Tittle yang ada di dataBlog
            isLogin
        }   
    })
    //console.log(file)

    response.render('blog',{isLogin, propertyBlog: file}) //nama "propertyBlog" bisa diganti terserah
})

/* let nawa = 'bambang oleng' */ 
app.post('/blog-detail/:kod', function(request,response){ //menampilkan data menggunakan hbs. Params adalah penampung yang bisa di isi sesuai keinginan kita
    /* console.log(request.params.kod); //menangkap params "kod" */
    let kode = request.params.kod // membuat variabel untuk menampung params
    /* response.render('blog-detail',{  //cara mengirimkan data
        blog: {
            codes: kode, 
            tittle: 'selamat datang bro laksa',
            content: 'lorem ipsum',
            author: 'Trie Aji',
            postAt: '17 June 2022 '
        } 
    }) */
    console.log(kode)
    let tampungBlog = dataBlog[kode]
    console.log(tampungBlog)
    response.render('blog-detail', tampungBlog)
    /* response.render('blog-detail',{nawa}) */
})

app.get('/add-blog', function(request,response){ //menampilkan data menggunakan hbs atau memanggil
    response.render('add-blog')
})

app.post('/add-blog', function(request,response){ // memanggil datanya atau memasukkan datanya. menangkap data hasil inputan
    //console.log(request);
    //console.log(request.body)
    /* console.log(request.body.inputCont) */ //apabila ingin menampilkan satu data saja
    let bucket = request.body // menampung data yang diinputkan untuk ditampilkan di halaman web
    bucket = {
        Tittle: bucket.inputTitle,
        Content: bucket.inputCont,
        Author: 'Mas Bambang',
        postAt: new Date(),
        //isLogin // memanggil "isLogin" supaya bisa melakukan update data atau menambahkan data
    }

    dataBlog.push(bucket)
    response.redirect('/blog') //mengarahkan akses ke "blog" atau agar pindah ke halaman yang blognya
})

   app.get('/edit/:index', function(request,response){ //menampilkan data menggunakan hbs atau memanggil
    let index = request.params.index;
    console.log(index);

    let edit = dataBlog[index];
    console.log(edit);

    response.render('edit', { edit });
}) 
app.post('/edit/:dit', function(request, response){
    let index = request.params.dit;
    let bucket = request.body // menampung data yang diinputkan untuk ditampilkan di halaman web
    bucket = {
        Tittle: bucket.inputTitle,
        Content: bucket.inputCont,
        Author: 'Mas Bambang',
        postAt: new Date(),
        //isLogin // memanggil "isLogin" supaya bisa melakukan update data atau menambahkan data
    }

    // dataBlog.push(bucket)
    //response.redirect('/blog') //mengarahkan akses ke "blog" atau agar pindah ke halaman yang blognya

    dataBlog[index] = bucket
    response.redirect('/blog');
}) 

/* app.get('/edit/:dex', function(request, response){
    let n = request.params.dex
    console.log(n)
    dataBlog.splice(dex,1,dex)
    response.redirect('/blog')
})  */

app.get('/delete/:index', function(request, response){
    //console.log(request.params.index)
    let index = request.params.index
    console.log(index)
    dataBlog.splice(index, 1)
    response.redirect('/blog')
})





//mengirimkan data menggunakan hbs atau set view engine hbs

// menampilkan data di dalam server kita (ngodingnya disini)
app.get('/', function(request,response){
    response.send('Hello bro')
})

app.get('/user', function(request,response){
    response.send('Hello user')
})

app.get('/contact', function(request,response){
    response.send('Hello contact')
})

/* app.get('/edit', function(request, response){
    response.send('hello edit')
}) */
// menampilkan data di dalam server kita (ngodingnya disini)

// menjalankan import
app.listen(port, function(request, response){
    console.log(`Server running ${port}`)
})
/* app.listen(port, (request,response) => {
    console.log(`Example app listening on port ${port}`)
}) */

// menjalankan import
// note -> jangan lupa direfresh -> clear -> node index.js