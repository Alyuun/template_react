import {asyncQuery} from "../config/database.js"

export default async (req, res) => {
    const {files, name} = req.body
    
    /*const uploadFile = new UploadFile() 
    await uploadFile.deleteFiles([
        "1028e079fcbbe742fe3787b00.jpg",
        "1028e079fcbbe742fe3787b01.png",
        "87595da134bbe9bd55a78f900.jpg",
        "aec3067af3b6dd6582df0db00.jpg",
        "bcde95922605ddfc6cd76d500.jpg",
        "cf463bb986b8d8b2096b51a00.jpg",
        "ddb657507bef036f7e4d55f00.jpg"])
    */
    
    /*const sqlPicture = 'INSERT INTO pictures (url) VALUES (?)'
    const result = await asyncQuery(sqlPicture,[files])*/
    res.json({result:files})
    
}