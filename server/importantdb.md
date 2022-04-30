# set auto delete record and update it

 db.otp.createIndex({"DateTime":1},{expireAfterSeconds:60})
                db.runCommand({
                   collMod: "otp",
                   index: {
                      keyPattern: { DateTime: 1 },
                      expireAfterSeconds: 3600
                   }
                })

# entire db creation
use images;
use users;
db.otp.createIndex({"DateTime":1},{expireAfterSeconds:3600})

# to modify the timing
db.runCommand({collMod: "otp",index: {keyPattern: { DateTime: 1 },expireAfterSeconds: 3600}});
