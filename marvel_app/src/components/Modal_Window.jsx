import React from 'react'
import './style.css'
import ReactDOM from 'react-dom'
export default class Modal extends React.Component{
    getMarvel(id){
        const publickey="e537dc2c5dc33361e21a30cc7bb9986a"
        const timestamp="1621539037864"
        const md5="4bde3e11acfda271610ce21d257a1ff3"
        fetch(`http://gateway.marvel.com/v1/public/comics?ts=${timestamp}&apikey=${publickey}&hash=${md5}`
        ).then((response)=>{
            return response.json()
        }).then((jsonParsed)=>{
            console.log(jsonParsed.data.results)
            jsonParsed.data.results.map(item=>{
                if(item.id===id){
                    this.setState({
                        comic:item,
                    })
                }
            })
            console.log(this.state.comic)
           this.setState({
               isLoaded:true,

           })
        })
        
    }
    state={
        comic:this.getMarvel(this.props.id),
        isLoaded:false,
    }
    
    generateModal(comic,title){
        const img_path=comic.thumbnail.path+'.'+comic.thumbnail.extension
        const creators=[]
        const resume=comic.description
        comic.creators.items.forEach(e=>{
            creators.push(e.name)
        })
        return(
            <div className="m_body">
                <div className="image"><img src={img_path} alt={title} /></div>
                <div className="cont">
                <div className="resume"><div className="r_t">Descrição</div>{resume}</div>
                <div className="creators"><div className="c_t">Criadores</div>{creators.map((e,i)=>{
                    return (
                        <div key={i}>{e}</div>
                    )
                })}</div>
                </div>
                
            </div>
        )
    }

    closeModal(){
        const este=document.querySelector('#modal')
        ReactDOM.unmountComponentAtNode(este)
    }
    render(){
        const {isLoaded,comic}=this.state
        if(isLoaded===false){
            return(
                <div className="modal_box"><div>Carregando</div></div>
                
            )
        }else if(isLoaded===true){
            return (
                <div className="modal_box">
                    <div className="close" onClick={e=>this.closeModal()}>×</div>
                    <div className="m_header">{this.props.title}</div>
                   {this.generateModal(comic,this.props.title)}
                </div>
            )
        }
        
    }
}