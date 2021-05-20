import React from 'react'
import './style.css'



export default class Grid extends React.Component{
    getMarvel(){
        const publickey="e537dc2c5dc33361e21a30cc7bb9986a"
        const timestamp="1621539037864"
        const md5="4bde3e11acfda271610ce21d257a1ff3"
        fetch(`http://gateway.marvel.com/v1/public/comics?ts=${timestamp}&apikey=${publickey}&hash=${md5}&limit=10`
        ).then((response)=>{
            return response.json()
        }).then((jsonParsed)=>{
            console.log(jsonParsed.data.results)
           this.setState({
               isLoaded:true,
               comics:jsonParsed.data.results,
           })
        })
    }
    state={
        comics:[this.getMarvel()],
        isLoaded:false
    }

    
    generateDivs(image,title,id){
        return(
        <div className="grid_item" key={id}>
            <div className=""><img  className="grid_img" src={image}/></div>
            <div className="grid_title">{title}</div>
        </div>)

    }
    render(){
        const {isLoaded,comics}=this.state
        if(isLoaded==false){
            return(<div className="loading">Carregando</div>)
        }else if(isLoaded==true){
            console.log(comics)
            return(
                comics.map((item,i)=>{
                    var image=item.thumbnail.path+'.'+item.thumbnail.extension
                    console.log(image)
                    var title=item.title
                    var id=item.id
                   return this.generateDivs(image,title,i)
                })
            )
        }
        
        
    }
}