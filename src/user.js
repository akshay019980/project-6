import React, { useState, useEffect } from 'react';
const Myuser = () => {
    let [list, updateList] = useState([]);
    const getList = () => {
        fetch(" http://localhost:1234/user")
            .then(response => response.json())
            .then(listArray => {
                updateList(listArray);
            })
    }
    useEffect(() => {
        getList();
    }, [1]);

    let [lfullname, pickFullName] = useState("");
    let [lmobileno, pickMobileNo] = useState("");
    let [lemailid, pickEMailId] = useState("");
    let [lfulladdress, pickAddress] = useState("");

    const save = () => {
        var newuser = {
            "fullname": lfullname,
            "mobileno": lmobileno,
            "emailid": lemailid,
            "fulladdress": lfulladdress
        };

        if (userid >= 0) {
            var url = " http://localhost:1234/user/" + userid;
            var postData = {
                headers: { "Content-Type": "application/json" },
                method: "PUT",
                body: JSON.stringify(newuser)
            }
        }
        else {
            var url = " http://localhost:1234/user";
            var postData = {
                headers: { "Content-Type": "application/json" },
                method: "POST",
                body: JSON.stringify(newuser)
            }
        }
        fetch(url, postData)
            .then(response => response.json())
            .then(serverResponse => {
                getList();// reload user list after updating
                pickFullName("");
                pickMobileNo("");
                pickEMailId("");
                pickAddress("");
                updateId(0);

            })
    }

    let [msg, updateMessage] = useState("");

    const deleteList = (id) => {
        var url = "  http://localhost:1234/user/" + id;
        var postData = {
            headers: { "Content-Type": "application/json" },
            method: "DELETE"
        }
        fetch(url, postData)
            .then(response => response.json())
            .then(serverRes => {
                getList(); // reload user list after the deleting
                updateMessage("List" + id + "Deleted Successfully !");
            })
    }

    let [userid, updateId] = useState(0);
    const editList = (index) => {
        pickFullName(list[index].fullname);
        pickMobileNo(list[index].mobileno);
        pickEMailId(list[index].emailid);
        pickAddress(list[index].fulladdress);
        updateId(list[index].id);
    }



    return (
        <>

            <div className="container mt-4">
                <div className="row">
                    <div className="col-lg-3">
                        <div className="p-3 shadow rounded">
                            <h4 className="text-center">Add New User</h4>
                            <hr />

                            <div className="mb-3">
                                <label>Full Name</label>
                                <input type="text" className="form-control"
                                    onChange={obj => pickFullName(obj.target.value)}
                                    value={lfullname} />
                            </div>

                            <div className="mb-3">
                                <label>Mobile No</label>
                                <input type="number" className="form-control"
                                    onChange={obj => pickMobileNo(obj.target.value)}
                                    value={lmobileno} />
                            </div>

                            <div className="mb-3">
                                <label>e-Mail id</label>
                                <input type="text" className="form-control"
                                    onChange={obj => pickEMailId(obj.target.value)}
                                    value={lemailid} />
                            </div>

                            <div className="mb-3">
                                <label>Full Address</label>
                                <textarea className="form-control"
                                    onChange={obj => pickAddress(obj.target.value)}
                                    value={lfulladdress}></textarea>
                            </div>

                            <div className="text-center">
                                <button className="btn btn-primary"
                                    onClick={save}>Save List</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-9">
                        <p class="text-center m-2"> {msg} </p>

                        <h4 className="text-center">{list.length} Available Users </h4>

                        <table className="table table-bordered mt-3 border shadow">
                            <thead>
                                <tr className="bg-light text-primary">
                                    <th>User Id</th>
                                    <th>Full Name</th>
                                    <th>Mobile No</th>
                                    <th>e-Mail id</th>
                                    <th>Address</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    list.map((list, index) => {
                                        return (
                                            <tr key={index}>
                                                <td> {list.id} </td>
                                                <td> {list.fullname} </td>
                                                <td> {list.mobileno} </td>
                                                <td> {list.emailid} </td>
                                                <td> {list.fulladdress} </td>
                                                <td>



                                                    <button className="btn btn-warning btn-sm m-1"
                                                        onClick={editList.bind(this, list.id, list.fullname)}>
                                                        <i className="fa fa-trash "></i>
                                                        Edit
                                                    </button>

                                                    <button className="btn btn-danger btn-sm m-1"
                                                        onClick={deleteList.bind(this, list.id)}>
                                                        <i className="fa fa-trash "></i>
                                                        Delete
                                                    </button>




                                                </td>

                                            </tr>
                                        )
                                    })
                                }

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Myuser;