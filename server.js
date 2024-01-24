const app=require ("./app");
const mongoose=require('mongoose');

const run= async () =>{
    try{
        const port = process.env.PORT || "3001";
        await mongoose.connect('mongodb://127.0.0.1:27017/taskDb');
        app.listen(port, () => console.log(`Listening on port: ${port}`));
    }
    catch(e){
        console.log(`error occured ${e}`);
        return
        
    }
}

run();

process.on('SIGINT', async () => {
    await mongoose.disconnect();
    process.exit(0);
});