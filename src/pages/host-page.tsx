import { useState, useReducer, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { PotlukkCreateReducer } from "../reducers/potlukk-create-reducer";
import { PotlukkActions ,LukkerUserState } from "../reducers/potlukk-reducer"
import { PotlukkCreationInputState } from "../reducers/potlukk-create-reducer"
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import { useNavigate } from "react-router-dom";
import { NavBar } from "../navigation/navbar";
import SearchComponent from "./invitation";

import DateTimePicker from 'react-datetime-picker';
import styled from "styled-components";

const Container1 = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const Label = styled.label`
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 2rem;
  justify-content: center;
  padding: 0.2rem;
  display: inline-flex;
`;

const DateTimeContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CalendarInput = styled(DateTimePicker)`
  font-size: 1.2rem;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-right: 1rem;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  width: 10%;
  margin-bottom: 1rem;
`;


const Container = styled.div`
  display: flex;
  flex-direction: row;
`;

const Column = styled.div`
  flex: 1;
  height: 100px;
  margin: 10px;
  
`;


export function Hostpage(){
    
    const lukkerSelector = useSelector((store: LukkerUserState) => store)
    const router = useNavigate();
    const initialState: PotlukkCreationInputState = {
      
      details: {
        title: "",
        location: "",
        status: "SCHEDULED",
        description: "",
        isPublic: false,
        time: 0,
        tags: []
      },
    
      hostId: Number(localStorage.getItem("userid"))
    }
    
    const [FormState, dispatchForm] = useReducer(PotlukkCreateReducer, initialState)
    const sendDispatch = useDispatch()<PotlukkActions>
    const [tagInput, setTagInput]= useState("")

    const [date1, setDate] = useState<Date>(new Date());
    //const date = new Date(FormState.details.time * 1000)

    function handleDateTimeChange(value: any){
        
        setDate(value)
        dispatchForm({ type: "SET_TIME", payload: value.getTime() / 1000});
      };
      
      return (
    <>
     <NavBar/>

     <Container>
      <Column />
      
           
             <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
             
               <div></div>
              <div></div>
                <div>  
                <h3>Welcome {localStorage.getItem("username")} #{FormState.hostId}</h3> 
                <div></div> 
                <div></div>                    
                <div></div>      
                            <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                                <Label>Date/Time </Label>
                                { <DateTimeContainer>
                                 <CalendarInput value={date1} onChange={handleDateTimeChange} /> 
                                
                
                                </DateTimeContainer> }
                                {/* <Calendar onChange={(value: any,event: any) => dispatchForm({type: "SET_TIME",payload: value.getTime() /1000})}/> */}
                            </div>
                            <div className="title-container">
                             <Label>Title</Label>
                             <input placeholder="title" onChange={(e)=>dispatchForm({type:"SET_TITLE", payload: e.target.value})}></input>
                            </div>
                            <div>
                            <Label>Location</Label>
                                <input placeholder="location" onChange={(e)=>dispatchForm({type:"SET_LOCATION", payload: e.target.value})}></input>
                            </div>
                            <div>
                            <Label>description </Label>
                                <input placeholder="description" onChange={(e)=>dispatchForm({type:"SET_DESCRIPTION", payload: e.target.value})}></input>
                            </div>
                            
                            <Label>MakePublic </Label>
                                <input placeholder="public" type="checkbox" onChange={() =>FormState.details.isPublic ? dispatchForm({type:"IS_PUBLIC", payload: false}) : dispatchForm({type:"IS_PUBLIC", payload: true})}></input>                                
                            
                            
                                <div>
                                <Label>TagName </Label>
                                    {/* <input placeholder="tags" onChange={(e)=> setTagInput(e.target.value)}></input> */}
                                    <input placeholder="tags" onChange={(e)=>dispatchForm({type:"ADD_TAG", payload: e.target.value})}></input>
                                </div>
                                <div>
                                    {/* <button onClick={(e)=>dispatchForm({type:"ADD_TAG", payload: tagInput})}>add tag</button> */}
                                </div>
                                <div>
                                    <div>{FormState.details.tags}</div>
                                </div>
                            
                            
                                <button onClick={() => 
                                {
                                    sendDispatch({type: "REQUEST_CREATE_POTLUKK", payload: FormState})
                                    router("/home");
                                    }}>CREATE POTLUKK</button>
                            </div>
                            </div>
                            <Column />
                   
                            <div className="invite-lukkers-container">
                            <SearchComponent/>
                            </div>
                            <Column />
                            <Column />
                            <Column />
    </Container>  
                      
                    
        </>
    )
}
    