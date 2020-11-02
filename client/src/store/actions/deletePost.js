import  axios  from  'axios';
function fetchDelete(){
    return {
        type:'DELETE_POST'
    }
}
// const  fetchService  =  username  =>  {
//     return  new  Promise((resolve,  reject)  =>  {
//         axios.get(`/${username}`)
//         .then(response  =>  resolve(response.data))
//         .catch(error  =>  reject(error))
//     })
// }
// // 
function fetchDeleteSerivce(id){
    return new Promise((resolve, reject) => {
        axios.delete(`/delete/${id}`)
          .then(response => resolve(response.data))
          .catch(error => reject(error))
      })
}
function fetchDeleteSuccess(data){
    return {
        type:'DELETE_SUCCESS',
        data:data
    }
}
function fetchDeleteFailed(err){
    return{
        type:'DELETE_ERROR',
        data: err
    }
}
export {
    fetchDelete,
    fetchDeleteSerivce,
    fetchDeleteSuccess,
    fetchDeleteFailed
  }