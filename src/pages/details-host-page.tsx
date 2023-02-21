
import { LukkerUserState, Potlukk, PotlukkActions } from "../reducers/potlukk-reducer";
import Calendar from 'react-calendar';
//import "../stylesheets/potlukk-detail-host-style.css"
import 'react-calendar/dist/Calendar.css';
import { NavBar } from "../navigation/navbar";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAlert } from "react-alert-with-buttons";
import { useEffect, useReducer, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PotlukkEditFormReducer, PotlukkEditInputState } from "../reducers/potluck-edit-reducer";
import SearchComponent from "./invitation";
import styled from "styled-components";
import DateTimePicker from "react-datetime-picker";

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

export function DetailHost(){
  const sendDispatch = useDispatch()<PotlukkActions>
  const alert = useAlert();
  const router = useNavigate();
  const {potlukk} = useParams();
  const potlukkId = Number(potlukk);
  let initialState: PotlukkEditInputState = {
    potlukkId: potlukkId,
    title: "",
    location: "",
    status: "SCHEDULED",
    description: "",
    isPublic: false,
    time: 0,
    tags: []

  }
  const [FormState, dispatchForm] = useReducer(PotlukkEditFormReducer, initialState)

  

  const [successMessage, setSuccessMessage] = useState("");

  const selector = useSelector((store: LukkerUserState) => store)

  const details = selector.currentPotluck.details

  let color;

  if (details.status.toString() === 'SCHEDULED') {
    color = 'green';
  } else if (details.status.toString() === 'CANCELLED') {
    color = 'RED';
  } else {
    color = 'black';
  }


  

  

  const currpotlukkId = selector.currentPotluck.potlukkId
  FormState.potlukkId = currpotlukkId
  
  const [tagInput, setTagInput]= useState("")

  useEffect(()=>{ // use effect for rest gets/ constant display
    sendDispatch({type: "REQUEST_GET_POTLUKK_BY_ID", payload: potlukkId}); // 
  },[]);

  let date = new Date(FormState.time * 1000)

  const [date1, setDate] = useState<Date>(new Date());
    //const date = new Date(FormState.details.time * 1000)

    function handleDateTimeChange(value: any){
        
        setDate(value)
        dispatchForm({ type: "EDIT_TIME", payload: value.getTime() / 1000});
      };

    function handleupdate(){
      sendDispatch({type:"REQUEST_EDIT_POTLUKK", payload: FormState})
      setSuccessMessage("Potlukk record updated successfully !!!")

    }

    function handleClick() {
      const result = window.confirm('Are you sure you want to cancel this Potlukk?');
  
      if (result) {
        console.log('User clicked Yes');
        sendDispatch({type:"REQUEST_CANCEL_POTLUKK", payload: FormState});

        setSuccessMessage("You have Cancelled the Potlukk !!!")
        window.close();
        //router("/home");
        // Perform Yes action here
      } else {
        console.log('User clicked No');
        // Perform No action here
        window.close()
      }
    }

    return (
    <>
      <NavBar/>

      <Column>
      <h3>Details of Pottluk # <b style={{ color }}>{currpotlukkId} </b> </h3> 
             <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
            
                <div>                     
                            <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                                <Label>Date/time </Label>
                                { <DateTimeContainer>
                                 <CalendarInput value={date1} onChange={handleDateTimeChange} /> 
                                
                
                                </DateTimeContainer> }
                                {/* <Calendar onChange={(value: any,event: any) => dispatchForm({type: "SET_TIME",payload: value.getTime() /1000})}/> */}
                            </div>
                            <div>
                             <Label>Title</Label>
                             <input  value={FormState.title} placeholder={details.title} onChange={(e) =>dispatchForm({type:"EDIT_TITLE", payload: e.target.value})}></input>
                            </div>
                            <div>
                            <Label>Location</Label>
                                <input value={FormState.location} placeholder={details.location} onChange={(e) =>dispatchForm({type:"EDIT_LOCATION", payload: e.target.value})}></input>
                            </div>
                            <div>
                            <Label>description </Label>
                                <input value={FormState.description} placeholder={details.description} onChange={(e) =>dispatchForm({type:"EDIT_DESCRIPTION", payload: e.target.value})}></input>
                            </div>
                            
                            <Label>MakePublic </Label>
                            {(FormState.isPublic) ? 
                                <input type="checkbox" placeholder={details.isPublic.toString()} onChange={() =>FormState.isPublic ? 
                                        dispatchForm({type:"EDIT_IS_PUBLIC", payload: false}) : 
                                        dispatchForm({type:"EDIT_IS_PUBLIC", payload: true})} checked></input> 
                                        :
                                <input type="checkbox" onChange={() =>FormState.isPublic ? 
                                        dispatchForm({type:"EDIT_IS_PUBLIC", payload: false}) : 
                                        dispatchForm({type:"EDIT_IS_PUBLIC", payload: true})}></input>}
                            
                            
                                <div>
                                <Label>TagName </Label>
                                    {/* <input placeholder="tags" onChange={(e)=> setTagInput(e.target.value)}></input> */}
                                    {/* <input placeholder={FormState.tags.map((item: any) => {{item.value}}} onChange={(e)=>dispatchForm({type:"ADD_TAG", payload: e.target.value})}></input> */}
                                    <input 
                                    placeholder={FormState.tags.map((item: any) =>  item.value).join('')} 
                                    onChange={(e) => dispatchForm({type: "ADD_TAG", payload: e.target.value})}
                                  />
                                
                                </div>      

                                <Label>Status </Label>

                                <Label style={{ color }}> {details.status} </Label>                          
                           
                                <div >
                                <button onClick={() =>{handleupdate()}}>Update</button>
                                
                                <button onClick={() =>{handleClick()}}>Cancel</button>
                                </div>

                                <div>
                                  <p><b>{successMessage} </b></p>
                                </div>
                               
                                
                            </div> 
                                  <div>
                                    <SearchComponent />
                                  </div>
                            </div>
                            <Column />
                            <Column />
                            <Column />
                            
                            </Column>
                            
       
        
                            
                            
    </>

      );
}