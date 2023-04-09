import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThreeDots } from "react-loader-spinner";

const AcceptInvitation = () => {
  const navigate = useNavigate();
  const [emailId, setEmailId] = useState("");
  const [proceed, setProceed] = useState(false);
  const [userData, setUserData] = useState([]);
  const params = useParams();
  console.log(params);
  var groupId = params.id;

  const [toggleInvitation, FtoggleInvitation] = useState(true);
  const notifyInvitation = () => {
    toast.success("Added to group successfully", {
      autoClose: 1200,
      pauseOnFocusLoss: false,
      transition: Flip,
    });
  };
  const failed = (msg) => {
    toast.error(msg, {
      autoClose: 1200,
      pauseOnFocusLoss: false,
      transition: Flip,
    });
  };
  const failedProcees = () => {
    toast.error("Email Id not registered", {
      autoClose: 1200,
      pauseOnFocusLoss: false,
      transition: Flip,
    });
  };

  const dlyInvitation = () => {
    setTimeout(() => {
      FtoggleInvitation(true);
      navigate('/dashboard/',{state:{groupid:groupId}});
    }, 1000);
  }
  const setInvitation = () => {
    setTimeout(() => {
      notifyInvitation();
      dlyInvitation();
    }, 2000);
  };
  const set2Invitation = (msg) => {
    setTimeout(() => {
      FtoggleInvitation(true);
      failed(msg);
    }, 2000);
  };
  const set2Proceed = () => {
    setTimeout(() => {
      failedProcees();
    }, 1000);
  };

  function handleemailId(event) {
    setEmailId(event.target.value);
    setProceed(false);
  }

  function fproceed() {
    console.log(proceed);
    verify();
  }
  function back() {
    console.log(proceed);
    setProceed(false);
  }

  const verify = async () => {
    try {
        const res = await fetch(`http://localhost:8000/user/profile/emailId/${emailId}`,{
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        })
        console.log(res.status);
        const data = await res.json();
        console.log(data);
        if(res.status === 422){
          set2Proceed();
        }
        else{
          setUserData(data[0]);
          if (res.status === 200) setProceed(true);
        }
        console.log('gaaya');
    }
    catch (error) {
      console.log("exit");
      set2Proceed();
  }
  };

  const addUser = async () => {
    try {
      FtoggleInvitation(false);
        const res = await fetch("http://localhost:8000/group/addUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          groupId: params.id,
          userId: userData._id,
        }),
      });
      await res.json();

      if(res.status===200){
        setInvitation();
      }
      else{
        set2Invitation("User already exist");
      }

    } catch (err) {
      FtoggleInvitation(false);
      set2Invitation("Error occured..!!");
    }
  };

  return (
    <div className=" flex justify-center h-1/5 ">
      <div className="bg-white shadow-2xl rounded-md  h-1/5 w-2/6 mt-20 p-10 ">
        {proceed ? (
          <div>
            <div>Click accept to join the group 🤖</div>

            {
              toggleInvitation ?
                <div className="flex ">
                  <div
                    className="w-1/2 p-4 mt-4 rounded-md m-2 bg-gray-400 text-white cursor-pointer hover:bg-opacity-80 "
                    onClick={back}
                  >
                    Back
                  </div><div
                    className="w-1/2 p-4 mt-4 rounded-md m-2 bg-primary text-white cursor-pointer hover:bg-opacity-80 "
                    onClick={addUser}
                  >
                    Accept
                  </div>
                </div> : <div className='items-center flex justify-center mt-5'>

                  <ThreeDots
                    height="50"
                    width="50"
                    radius="9"
                    color="#6B60F1"
                    ariaLabel="three-dots-loading"
                    wrapperStyle={{}}
                    wrapperClassName=""
                    visible={true}
                  />
                </div>
            }


          </div>
        ) : (
          <div>
            <div className="mb-2">
              <label htmlFor="emailId" className="block text-gray-700  mb-2">
                Enter your registered Email Id:
              </label>
              <input
                type="text"
                id="emailId"
                name="emailId"
                className="w-full border border-gray-400 p-2 rounded-lg focus:outline-none focus:border-indigo-500"
                value={emailId}
                onChange={handleemailId}
                required
              />
            </div>
            <div className="flex justify-center">
              <button
                className="bg-lgPrimary rounded-md w-1/2 mt-2 p-2 text-white cursor-pointer hover:bg-opacity-90"
                onClick={fproceed}
              >
                Proceed
              </button>
            </div>
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default AcceptInvitation;
