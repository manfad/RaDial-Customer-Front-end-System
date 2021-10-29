const mongoose = require('mongoose')

const nEmployer = mongoose.Schema({
    email: String,
    password: String,
    cname:String,
    address:String
})

const mEmployer = mongoose.model('Eployer',nEmployer)

async function connect() {
    await mongoose.connect('mongodb://127.0.0.1:27017/testdb')
    console.log('yay connected')
}

connect().then(()=>{
    console.log('CONNECTED!!')
}).catch(err=>{
    console.error(err)
})

module.exports = {
    list: ()=>{
        return new Promise((success,fail)=>{
            mEmployer.find({}).then(data=>{
                success(data)
            }).catch(err=>{
                fail(err)
            })
        })
    },
    listx: ()=>{
        let data = [{data:'nodata'}]
        mEmployer.find({}).then(d=>{
            data = d
        }).catch(err=>{
            return err
        })
        return data
    },
    load: (key)=>{},
    save: (data)=>{
        return new Promise((resolve,reject)=>{
            let newEmployer = new mEmployer(data)
            newEmployer.save().then(data=>{
                resolve(data)
            }).catch(err=>{
                reject(err)
            })

        })
    },
    delete: (key)=>{
        return new Promise((resolve,reject)=>{
            mEmployer.deleteOne({_id:key}).then(data=>{
                resolve(data)
            }).catch(err=>{
                reject(err)
            })

        })
        
    },
    update: (key,newdata)=>{
        return new Promise((resolve,reject)=>{
            mEmployer.updateOne({_id:key},newdata).then(data=>{
                resolve(data)
            }).catch(err=>{
                reject(err)
            })
        })
    }
}