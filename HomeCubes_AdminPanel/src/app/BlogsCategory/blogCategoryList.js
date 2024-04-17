import React, { Component, useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import bsCustomFileInput from 'bs-custom-file-input';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory, Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import ReactDatatable from '@ashvin27/react-datatable';
import config from '../../lib/config.js'
import EditFaq from "../faqlist/editfaq.js"
import { getFaqList, addFaqCall, getFaqContentsList, addFaqcontentCall } from '../../axioscalls/user.js'
import { getblogCategories } from '../../axioscalls/admin.js';

toast.configure();


export function BlogCategoryList() {

    const history = useHistory();
    const { Categorys, UserAccountAddr, web3, web3p } = useSelector(
        (state) => state.wallet_detail
      );
    var location = useLocation();
    const { pathname, state } = location;
    const path = pathname.split("/")[1]
    console.log("pathname,stae", pathname, state, path)

    const [catList, setCatList] = useState([]);
    const [contents, setContents] = useState([]);

    useEffect(() => {
        bsCustomFileInput.init()

    }, [])



    const columns = [
        {
            key: "title",
            text: "Title",
            className: "NFT NAME",
            align: "left",
        },
        // {
        //     text: "Edit category",
        //     className: "NFT IDT",
        //     align: "left",
        //     // sortable: true,
        //     cell: record =>
        //         <div><Link to={{ pathname: '/blogCategoryEdit', state: record }}><button className='btn allbtn allbtns' type='button'>Edit</button></Link></div>

        // },
        {
            text: "Hide/Show",
            className: "NFT IDT",
            align: "left",
            // sortable: true,
            cell: record =>
                <div onClick={() => onDelete(record)} >

                    <img
                        className="img-xs rounded-circle"
                        src={!record.deleted ?
                            require("../../assets/images/eye.svg") :
                            require("../../assets/images/eye-crossed.png")}
                        alt="profile"
                    />
                </div>

        },
    ]

    useEffect(() => {
        getBlogCategoryFunc()
    }, [])

    const getBlogCategoryFunc = async () => {
        const getData = await getblogCategories({ action: "get" });
        console.log("getData on getBlogCategoryFunc", getData);
        setCatList(getData?.data ?? [])
    }

    const onDelete = async (rec) => {
        const setData = { action: "delete", _id: rec._id, deleted: !rec.deleted }
        const delData = await getblogCategories(setData);
        console.log("sufguiefesf", delData);
        if (delData?.success == "success") {
            toast.success(!rec.deleted ? "hide successfully" : "Showed successfully")
            setTimeout(() => {
                getBlogCategoryFunc()
            }, 1000)
        }
    }

    return (

        <>

            <div>
                <div className="page-header">
                    <nav aria-label="breadcrumb">

                    </nav>
                </div>
                <div className="row">

                    <div className="col-lg-12 grid-margin stretch-card">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title">Blog Category List</h4>
                                {UserAccountAddr.toLowerCase() ==
                                    config.AdminAddress.toLowerCase() && <Link to="/blogCategoryAdd" >
                                    <button className='btn mb-3 allbtn' type='button'>Add category</button>
                                </Link>}
                                <div className='faq'>
                                    <ReactDatatable
                                        // className="tension"
                                        records={catList}
                                        columns={columns}
                                    />
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </div>

        </>

    )
}

export default BlogCategoryList;
