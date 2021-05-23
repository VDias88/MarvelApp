import React from 'react'
import './style.css'
import Modal from './Modal_Window'
import ReactDOM from 'react-dom'

export default class Grid extends React.Component{
    getMarvel(offset){
        const publickey="e537dc2c5dc33361e21a30cc7bb9986a"
        const timestamp="1621539037864"
        const md5="4bde3e11acfda271610ce21d257a1ff3"
        fetch(`http://gateway.marvel.com/v1/public/comics?ts=${timestamp}&apikey=${publickey}&hash=${md5}&limit=15&offset=${offset||0}`
        ).then((response)=>{
            return response.json()
        }).then((jsonParsed)=>{
            
           this.setState({
               isLoaded:true,
               comics:jsonParsed.data.results.filter(e=>e.title.indexOf("Marvel Previews")===-1),
           })
        })
    }
    state={
        comics:[this.getMarvel()],
        isLoaded:false,
        clicked:false,
        id:0,
    }
    
    closeModal(){
        this.setState({clicked:false,id:0})
    }
    showModal(id,title){
        ReactDOM.render(
            <Modal  title={title} id={id}/>
        ,document.getElementById('modal'))
    }
    
    generateDivs(image,title,id){
        return(
        <div className="grid_item" onClick={e=>this.showModal(id,title)} key={id}>
            <div className="">
                <div className="grid_title">
                    <div className="title">{title}</div>
                </div>
                <img  className="grid_img" alt={title} src={image}/>
            </div>
        </div>)
    }
    render(){
        const {isLoaded,comics}=this.state
        if(isLoaded===false){
            return(<div className="loading">Carregando</div>)
        }else if(isLoaded===true){
            return(  
                <div className="grid">
                    {comics.map((item,i)=>{
                        
                            var image=item.thumbnail.path+'.'+item.thumbnail.extension
                            var title=item.title
                            var id=item.id
                            return this.generateDivs(image,title,id)
                        
                    
                })}
                <div onClick={e=>{this.getMarvel(10)}} className="grid_more">
                    <div>+</div>
                </div>
                </div>
            )
        }
        
        
    }
}