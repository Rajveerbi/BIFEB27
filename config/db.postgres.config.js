const pgconfig={
    HOST:"localhost",
    PORT: '5432',
    USER:"postgres",
    PASSWORD:"Rajveer@123",
    DB:"tuts",
    dialect:"postgres",
    pool:{
        max:5,
        min:0,
        acquire:30000,
        idle:10000
    }
}
export default pgconfig