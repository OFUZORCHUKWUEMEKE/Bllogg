import bcrypt from 'bcryptjs'

export const generateSalt = async ()=>{
    return await bcrypt.genSalt()
}

export const HashedPassword = async(password:string,salt:string)=>{
    return await bcrypt.hash(password,salt)
  
}
export const ComparePassword = async(password:string,hashedPassword:string)=>{
    return await bcrypt.compare(password,hashedPassword)
}