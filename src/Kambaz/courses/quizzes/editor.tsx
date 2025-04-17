import {  Button, Form, FormControl, FormSelect } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
// import { updateAssignment, addAssignment }
//      from "./reducer";
     import { v4 as uuidv4 } from "uuid";
import { IoEllipsisVertical } from "react-icons/io5";
import { GoCircleSlash } from "react-icons/go";
import { BiPlus } from "react-icons/bi";
// import SaveButton2 from "./SaveButton2";
// {addAssignment}: {addAssignment:()=>void;}


export default function Editor(
) {

     const { cid, aid } = useParams();
     const dispatch = useDispatch();
     // const assignments = db.assignments;
     const [assignmentTitle, setAssignmentTitle] = useState("");
     const [assignmentDes, setAssignmentDes] = useState("");
     const [assignmentPoints, setAssignmentPoints] = useState("");
     const [dueDate, setDueDate] = useState("");
     const [from, setFrom] = useState("");
     const [until, setUntil] = useState("");
     const { assignments } = useSelector((state: any) => state.assignmentReducer);
     // const navigate = useNavigate();

     //    console.log("addAssignment:", addAssignment);

        const handleUpdateAssignment = () => {
          const newAssignment = {
            _id:aid || uuidv4(), 
            title: assignmentTitle,
            course: cid,
            description: assignmentDes, 
            points: assignmentPoints, 
            dueDate: dueDate, 
            getAvailableFrom: from, 
            getAvailableUntil: until, 
            assignment: aid,
          };
          // updateAssignment();
          // if (assignments) {
          //      dispatch(updateAssignment(newAssignment));
          //    } else {
          //      dispatch(addAssignment(newAssignment)); 
          //    }
          // dispatch(updateAssignment(newAssignment));
         
        };
        useEffect(() => {
          const assignment = assignments.find((a: any) => a._id === aid);
          if (assignment) {
            setAssignmentTitle(assignment.title);
            setAssignmentDes(assignment.description);
            setAssignmentPoints(assignment.points);
            setDueDate(assignment.dueDate);
            setFrom(assignment.getAvailableFrom);
            setUntil(assignment.getAvailableUntil);
          }
        }, [assignments, aid]);

     return (
          <div>
               <div id="wd-assignments-editor" className="bring-over ">
                    <h4 className="float-end mt-4"> <IoEllipsisVertical className=" float-end " /> <h5 className="float-end me-2 fw-bold">Not Published </h5> 
                    <GoCircleSlash className=" float-end me-1 ms-3" /> 
                       Points 0 </h4>
                         

                    <FormControl type="text" onChange={(e) => setAssignmentTitle(e.target.value)} value={assignmentTitle} placeholder={assignments?.title} /> <br />
                    <h5> Quiz Instructions:</h5> 
                    <div className="ms-4 d-flex"> <div className="me-3">Edit </div> <div className="me-3">View </div> 
                    <div className="me-3">Insert </div> <div className="me-3">Format </div> 
                    <div className="me-3">Tools </div> <div className="me-3">Table </div></div>  <br />
                    <FormControl as="textarea" rows={14} placeholder={assignmentDes}  onChange={(e) => setAssignmentDes(e.target.value)}/>
                    <table>
                         <br />
                         <br /><tr><td valign="top" align="right" >
                              <label htmlFor="wd-points">Points</label></td>
                              <td><FormControl type="text" className="center-box" value={assignmentPoints} onChange={(e) => setAssignmentPoints(e.target.value)}/>
                              </td>

                         </tr><br />
                         <tr>
                              <td align="right" valign="top"><label htmlFor="wd-group">Quiz Type</label>
                              </td>
                              

                              <td><FormSelect className="center-box" >
                                   <option selected>Graded Quiz</option>
                                   <option value="1">Practice Quiz</option>
                                   <option value="2">Graded Survey</option>
                                   <option value="3">Ungraded Survey</option>
                              </FormSelect>
                              </td>
                         </tr> <br/>
                        
                         
                         <br />
                        


                         <tr>
                              <td align="right" valign="top" >
                                   <label htmlFor="wd-submission-type" ></label>
                              </td>
                              <div className=" h-100">
                                 

                                   <br />
                                   <div className="center-box-next">
                                        <td align="left" valign="top">
                                             <label htmlFor="wd-text-entry " className="fw-bold">Options</label><br /><br />

                                             <Form>
                                                  <Form.Check
                                                       type="checkbox"
                                                       label="Shuffle Answers"
                                                       id="wd-text-entry"
                                                  /><br />
                                                  <div className="d-flex form-group col-md-2"> 
                                                       <Form.Check
                                                       type="checkbox"
                                                       label="Time Limit"
                                                       id="wd-website-url"
                                                       className="me-4"
                                                  /> 
                                                  <FormControl className="form-group col-sm-2 me-3"
                                                  value={"hello"}
                                                  size="sm"/>Minutes</div>
                                                  
                                                  
                                                  <br />
                                             </Form>
                                        </td>
                                   </div>


                              </div>

                         </tr>


                         <br />


                         <tr>
                              <td align="right" valign="top">
                                   <label htmlFor="wd-assign-to">Assign</label>
                              </td>
                         </tr>
                         <div className="card move-card-2 h-100"> <br />
                              <td className="center-box-next">
                                   <label htmlFor="wd-assign-to">Assign To</label><br />
                                   <td className="small-dropdown-2"><FormControl className="small-dropdown-2" type="text" value="Everyone" />
                                   </td>

                              </td>
                              <tr>
                                   {/* <td className="center-box-next"></td> */}
                                   <td className="center-box-next"><br />
                                        <label htmlFor="wd-due-date">Due</label><br />
                                        <div className="small-dropdown-2"><FormControl value={dueDate} className="small-dropdown-2" type="date" onChange={(e) => setDueDate(e.target.value)} id="wd-due-date" /></div>
                                        <br />
                                   </td>

                              </tr>
                              <tr>

                                   <td className="center-box-next">
                                        <label htmlFor="wd-available-from">Available from</label> <br />
                                        <div className="half-size"> <FormControl type="date" value={from} onChange={(e) => setFrom(e.target.value)} id="wd-available-from" /><br /> </div>


                                   </td >
                                   <td className="center-box-next">
                                        <label htmlFor="wd-available-until">Until</label> <br />
                                        <div className="half-size"> <FormControl type="date" value={until} onChange={(e) => setUntil(e.target.value)} id="wd-available-until" /><br /></div>

                                   </td>
                              </tr>
                              <Button className="btn-secondary"> <BiPlus/> Add</Button>
                              

                         </div>



                    </table>

                    <hr />
                    <table width="100%" ><tr>
                         <td align="right" style={{ display: "flex-right", gap: "5px", justifyContent: "flex-end" }}>
                              <Link className="btn btn-lg btn-secondary" id="wd-add-module-btn" to={`/Kambaz/Courses/${cid}/Assignments`}>

                                   Cancel
                              </Link> &nbsp;


                              <Link className="btn btn-lg btn-danger" id="wd-add-module-btn" to={`/Kambaz/Courses/${cid}/Assignments`}>

                                   Save
                              </Link> &nbsp;
                              
                              {/* <SaveButton2 updateAssignment={handleUpdateAssignment} /> */}
                         </td>
                    </tr></table>

               </div>

          </div>
     );
}