import React, { useState, useContext } from "react";
import { dataContext } from "./UserContext";
import { useDispatch, useSelector } from "react-redux";
import Header from "./Header";
import { useEffect } from "react";
import axios from "axios";
import { setPdfData } from "./redux/userSlice";

function ViewPDF() {
    let { serverUrl } = useContext(dataContext);
    let { pdfData } = useSelector(state => state.user);
    const [activePdfUrl, setActivePdfUrl] = useState(null);

    // Return se pehle sirf ye line likho:
    const newPdf = pdfData ? pdfData[0] : null;

    // Ab ye check karo:
    // console.log("Ye raha 0 index wala data:", newPdf);

    let [search, setSearch] = useState("")

    let dispatch = useDispatch()

    useEffect(() => {
        const handlSearch = async () => {
            if (!search || search.trim() === "") {
                return;
            }
            try {
                let res = await axios.get(`${serverUrl}/searchPdf?courseName=${search}`, { withCredentials: true })
                console.log("Backend Se Aaya Data:", res.data);
                dispatch(setPdfData(res.data))
            } catch (error) {
                console.log(error.response.data.message)
            }
        }
        const timer = setTimeout(() => {
            handlSearch()
        }, 400);

        return () => clearTimeout(timer)

    }, [search])
    return (
        <div className="">
            <Header />
            <div className="searchDiv">
                <input type="search" name="" placeholder="Search PDF..." id="search" onChange={(e) => { setSearch(e.target.value) }} value={search} />

            </div>
            <h2 style={{ textAlign: "center", marginBottom: "9px", marginTop: "5px", fontFamily: "arial black" }}>Available Notes & PDFs</h2>

            <div className="my-container">
                {pdfData && [...pdfData].reverse().map((value, index) => {
                    let finalPdfUrl = value.pdfUrl.replace('http://localhost:8000', serverUrl);
                    const newPdf = pdfData && pdfData.length > 0 ? pdfData[pdfData.length - 1] : null;
                    return (
                        <div className="" key={index}>
                            <div className="pdfBoxDivMain">
                                <div className="pdfBoxDiv" >
                                    {newPdf && newPdf._id === value._id && (
                                        <span style={{ color: "white", fontWeight: "bold", backgroundColor: "rgb(21, 255, 0)", position: "absolute", left: "35px", paddingInline: "7px", paddingBlock: "3px", borderRadius: "5px" }}>New!</span>
                                    )}
                                    <div className="">
                                        <span id="courseName">{value.courseName}</span>
                                        <h1 id="courseNameTitle">{value.title}</h1>
                                    </div>
                                    <button id="ViewPDF" onClick={() => setActivePdfUrl(finalPdfUrl)}>
                                        View PDF ↗
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {activePdfUrl && (
                <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", zIndex: 9999, background: "white" }}>
                    <div style={{ padding: "10px", background: "#333", color: "white", display: "flex", justifyContent: "space-between" }}>
                        <span>PDF Viewer</span>
                        <button onClick={() => setActivePdfUrl(null)}>Close</button>
                    </div>

                    <div style={{ position: "relative", width: "100%", height: "92vh" }}>
                        {/* YEH HAI WOH GLASS WALL JO DOWNLOAD BUTTON KO BLOCK KAREGI */}
                        <div style={{
                            position: "absolute", top: 0, left: 0, width: "100%", height: "80px",
                            zIndex: 99, background: "transparent"
                        }} />

                        <iframe
                            src={activePdfUrl}
                            style={{ width: "100%", height: "100%", border: "none" }}
                            title="PDF Viewer"
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

export default ViewPDF;