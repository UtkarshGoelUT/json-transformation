import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./CodeGenerator.css";

const allowedExtensions = ["json"];

function isJsonString(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

const CodeGenerator = (props) => {
  const [name, setName] = useState("");

  const [description, setDescription] = useState("");

  const [sourceJsonButton, setSourceJsonButton] = useState(false);
  const [sourceJSON, setSourceJSON] = useState("");

  const [targetJsonButton, setTargetJsonButton] = useState(false);
  const [targetJSON, setTargetJSON] = useState("");

  const [mappingJsonButton, setMappingJsonButton] = useState(false);
  const [mappingJSON, setMappingJSON] = useState("");

  const [error, setError] = useState("");

  const [data, setData] = useState({});

  const [code, setCode] = useState({});

  useEffect(() => {
    getCode();
  }, [data]);

  const getCode = async () => {
    const c = data[0]
      ? await fetch(`${process.env.REACT_APP_BACKEND}/users/id`, {
          method: `POST`,
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ id: data[0].id }),
        })
      : "";
    const res = await c.json();
    console.log(res);
    setCode(res);
  };

  const nameChangeHandler = (e) => {
    setName(e.target.value);
  };

  const descriptionChangeHandler = (e) => {
    setDescription(e.target.value);
  };

  const checkError = (e) => {
    const inputFile = e.target.files[0];

    // Check the file extensions, if it not
    // included in the allowed extensions
    // we show the error
    const fileExtension = inputFile?.type.split("/")[1];
    if (!allowedExtensions.includes(fileExtension)) {
      setError("Please input a json file");
      return;
    }

    if (!inputFile) return setError("Enter a valid file");
  };

  const sourceJsonFileReader = (e) => {
    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0], "UTF-8");
    fileReader.onload = (e) => {
      console.log(e.target.result);
      setSourceJSON(e.target.result);
    };
  };

  const sourceJsonFileUploadHandler = (e) => {
    setError("");
    // Check if user has entered the file
    if (e.target.files.length) {
      checkError(e);
      sourceJsonFileReader(e);
    }
  };

  const sourceJsonButtonHandler = () => {
    setSourceJsonButton(true);
  };

  const sourceJsonTextChangeHandler = (e) => {
    setSourceJSON(e.target.value);
  };

  const targetJsonFileReader = (e) => {
    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0], "UTF-8");
    fileReader.onload = (e) => {
      console.log(e.target.result);
      setTargetJSON(e.target.result);
    };
  };

  const targetJsonFileUploadHandler = (e) => {
    setError("");
    // Check if user has entered the file
    if (e.target.files.length) {
      checkError(e);
      targetJsonFileReader(e);
    }
  };

  const targetJsonButtonHandler = () => {
    setTargetJsonButton(true);
  };

  const targetJsonTextChangeHandler = (e) => {
    setTargetJSON(e.target.value);
  };

  const mappingJsonFileReader = (e) => {
    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0], "UTF-8");
    fileReader.onload = (e) => {
      console.log(e.target.result);
      setMappingJSON(e.target.result);
    };
  };

  const mappingJsonFileUploadHandler = (e) => {
    setError("");
    // Check if user has entered the file
    if (e.target.files.length) {
      checkError(e);
      mappingJsonFileReader(e);
    }
  };

  const mappingJsonButtonHandler = () => {
    setMappingJsonButton(true);
  };

  const mappingJsonTextChangeHandler = (e) => {
    setMappingJSON(e.target.value);
  };

  let res = {};

  const submitHandler = async () => {
    // console.log(isJsonString(files))
    let sourceJsonData = isJsonString(sourceJSON) ? JSON.parse(sourceJSON) : {};
    let targetJsonData = isJsonString(targetJSON) ? JSON.parse(targetJSON) : {};
    let mappingJsonData = isJsonString(mappingJSON)
      ? JSON.parse(mappingJSON)
      : {};

    res["name"] = name;
    res["email"] = props.user.email;
    res["description"] = description;
    res["input"] = sourceJsonData;
    res["output"] = targetJsonData;
    res["mapping"] = mappingJsonData;

    console.log(JSON.stringify(res));
    // axios.post('https://81ae-14-139-234-179.ngrok.io/generate', { "Accept": "application/json", "Content-Type": "application/json" }, JSON.stringify(res))
    //     .then((result) => {
    //         console.log(result);
    //     })
    //     .catch((error) => {
    //         console.log(error);
    //     });

    const result = await fetch(`${process.env.REACT_APP_BACKEND}/generate`, {
      method: `POST`,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(res),
    });
    const d = await result.json();
    setData(d);
    console.log(d);

    // console.log(result);
  };

  return (
    <div className={"box"}>
      <div className={"formStyle"}>
        <Form className={"formItems"}>
          <Form.Control
            type="text"
            placeholder="Specification Name"
            value={name}
            onChange={nameChangeHandler}
          />
          <div className={"InputOutput"}>
            <div className={"sourceJson"}>
              <Form.Group controlId="exampleForm.ControlTextarea1">
                {/* {console.log(data)} */}
                <Form.Control
                  as="textarea"
                  rows={5}
                  value={sourceJSON}
                  onChange={sourceJsonTextChangeHandler}
                />
              </Form.Group>
              {sourceJsonButton ? (
                <Form.Group
                  style={{ marginTop: "10px" }}
                  controlId="formFile"
                  onChange={(e) => {
                    sourceJsonFileUploadHandler(e);
                  }}
                >
                  <Form.Control type="file" />
                  {error ? error : null}
                </Form.Group>
              ) : (
                <Button
                  variant="light"
                  className={"button"}
                  onClick={sourceJsonButtonHandler}
                >
                  Upload Source JSON
                </Button>
              )}
            </div>
            <div className={"targetJson"}>
              <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Control
                  as="textarea"
                  rows={5}
                  value={targetJSON}
                  onChange={targetJsonTextChangeHandler}
                />
              </Form.Group>
              {targetJsonButton ? (
                <Form.Group
                  style={{ marginTop: "10px" }}
                  controlId="formFile"
                  onChange={(e) => {
                    targetJsonFileUploadHandler(e);
                  }}
                >
                  <Form.Control type="file" />
                  {error ? error : null}
                </Form.Group>
              ) : (
                <Button
                  variant="light"
                  className={"button"}
                  onClick={targetJsonButtonHandler}
                >
                  Upload Target JSON
                </Button>
              )}
            </div>
          </div>
          <div className={"mappingJson"}>
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Control
                as="textarea"
                rows={6}
                value={mappingJSON}
                onChange={mappingJsonTextChangeHandler}
              />
            </Form.Group>
            {mappingJsonButton ? (
              <Form.Group
                style={{ marginTop: "10px" }}
                controlId="formFile"
                onChange={(e) => {
                  mappingJsonFileUploadHandler(e);
                }}
              >
                <Form.Control type="file" />
                {error ? error : null}
              </Form.Group>
            ) : (
              <Button
                className={"button"}
                variant="light"
                onClick={mappingJsonButtonHandler}
              >
                Upload Mapping JSON
              </Button>
            )}
          </div>
          <Button
            className={"button"}
            variant="light"
            type="button"
            onClick={submitHandler}
          >
            Submit
          </Button>
        </Form>
        <div className="outputCode">
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Control as="textarea" rows={19} value={code.code} />
          </Form.Group>
          <img
            onClick={() => {
              navigator.clipboard.writeText(code.code);
            }}
            style={{
              height: "22px",
              marginTop: "10px",
              marginLeft: "40vw",
              cursor: "pointer",
            }}
            src={require("../../images/copy.png")}
            alt="not found"
          />
          <img
            onClick={() => {
              const url = window.URL.createObjectURL(new Blob([code.code]));
              const link = document.createElement("a");
              link.href = url;
              link.setAttribute("download", "code.py"); //or any other extension
              document.body.appendChild(link);
              link.click();
            }}
            style={{
              height: "35px",
              marginTop: "10px",
              cursor: "pointer",
              marginLeft: "20px",
            }}
            src={require("../../images/download.png")}
            alt="not found"
          />
        </div>
      </div>
    </div>
  );
};
export default CodeGenerator;
