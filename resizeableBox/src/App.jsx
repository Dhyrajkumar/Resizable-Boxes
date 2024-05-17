import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [data, setData] = useState("");
  const [previewImage, setPreviewImage] = useState(null);
  const [count, setCount] = useState({ addCount: 0, updateCount: 0 });

  const [text, setText] = useState({ text1: '', text2: '', text3: '' });

  const refLeftBox = useRef(null);
  const refCenterBox = useRef(null);
  const refRightBox = useRef(null);

  const refLeft = useRef(null);
  const refTop = useRef(null);
  const refRight = useRef(null);
  const refBottom = useRef(null);

  const refLeft2 = useRef(null);
  const refTop2 = useRef(null);
  const refRight2 = useRef(null);
  const refBottom2 = useRef(null);

  const refLeft3 = useRef(null);
  const refTop3 = useRef(null);
  const refRight3 = useRef(null);
  const refBottom3 = useRef(null);


  useEffect(() => {
    const resizableElements = [
      {
        element: refLeftBox.current,
        resizers: [refLeft.current, refTop.current, refRight.current, refBottom.current],
      },
      {
        element: refCenterBox.current,
        resizers: [refLeft2.current, refTop2.current, refRight2.current, refBottom2.current],
      },
      {
        element: refRightBox.current,
        resizers: [refLeft3.current, refTop3.current, refRight3.current, refBottom3.current],
      },
    ];

    resizableElements.forEach(({ element, resizers }) => {
      const styles = window.getComputedStyle(element);
      let width = parseInt(styles.width, 10);
      let height = parseInt(styles.height, 10);
      let x = 0;
      let y = 0;

      element.style.top = "50px";
      element.style.left = "50px";

      // Right resize
      const onMouseMoveRightResize = (event) => {
        const dx = event.clientX - x;
        x = event.clientX;
        width = width + dx;
        element.style.width = `${width}px`;
      };

      const onMouseUpRightResize = () => {
        document.removeEventListener("mousemove", onMouseMoveRightResize);
      };

      const onMouseDownRightResize = (event) => {
        x = event.clientX;
        element.style.left = styles.left;
        element.style.right = null;
        document.addEventListener("mousemove", onMouseMoveRightResize);
        document.addEventListener("mouseup", onMouseUpRightResize);
      };

      // Top resize
      const onMouseMoveTopResize = (event) => {
        const dy = event.clientY - y;
        height = height - dy;
        y = event.clientY;
        element.style.height = `${height}px`;
      };

      const onMouseUpTopResize = () => {
        document.removeEventListener("mousemove", onMouseMoveTopResize);
      };

      const onMouseDownTopResize = (event) => {
        y = event.clientY;
        const styles = window.getComputedStyle(element);
        element.style.bottom = styles.bottom;
        element.style.top = null;
        document.addEventListener("mousemove", onMouseMoveTopResize);
        document.addEventListener("mouseup", onMouseUpTopResize);
      };

      // Bottom resize
      const onMouseMoveBottomResize = (event) => {
        const dy = event.clientY - y;
        height = height + dy;
        y = event.clientY;
        element.style.height = `${height}px`;
      };

      const onMouseUpBottomResize = () => {
        document.removeEventListener("mousemove", onMouseMoveBottomResize);
      };

      const onMouseDownBottomResize = (event) => {
        y = event.clientY;
        const styles = window.getComputedStyle(element);
        element.style.top = styles.top;
        element.style.bottom = null;
        document.addEventListener("mousemove", onMouseMoveBottomResize);
        document.addEventListener("mouseup", onMouseUpBottomResize);
      };

      // Left resize
      const onMouseMoveLeftResize = (event) => {
        const dx = event.clientX - x;
        x = event.clientX;
        width = width - dx;
        element.style.width = `${width}px`;
      };

      const onMouseUpLeftResize = () => {
        document.removeEventListener("mousemove", onMouseMoveLeftResize);
      };

      const onMouseDownLeftResize = (event) => {
        x = event.clientX;
        element.style.right = styles.right;
        element.style.left = null;
        document.addEventListener("mousemove", onMouseMoveLeftResize);
        document.addEventListener("mouseup", onMouseUpLeftResize);
      };

      // Add mouse down event listener
      resizers[0].addEventListener("mousedown", onMouseDownLeftResize);
      resizers[1].addEventListener("mousedown", onMouseDownTopResize);
      resizers[2].addEventListener("mousedown", onMouseDownRightResize);
      resizers[3].addEventListener("mousedown", onMouseDownBottomResize);

      return () => {
        resizers[0].removeEventListener("mousedown", onMouseDownLeftResize);
        resizers[1].removeEventListener("mousedown", onMouseDownTopResize);
        resizers[2].removeEventListener("mousedown", onMouseDownRightResize);
        resizers[3].removeEventListener("mousedown", onMouseDownBottomResize);
      };
    });
  }, []);



  useEffect(() => {
    fetchCount();
  }, []);

  const fetchCount = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/count");
      setCount(response.data || { addCount: 0, updateCount: 0 });
    } catch (error) {
      console.error("Error fetching count:", error);
    }
  };

  const handleAdd = async () => {
    try {
      await axios.post("http://localhost:5000/api/add", text);
      setText({ text1: '', text2: '', text3: '' });
      fetchCount();
    } catch (error) {
      console.error("Error adding data:", error);
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.post("http://localhost:5000/api/update", text);
      fetchCount();
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-slate-600">
      <div className="flex flex-row p-4 bg-gray-400 shadow-xl items-center mb-1 border-2 border-red-950 rounded-md">
        <input
          type="text"
          value={data}
          onChange={(e) => setData(e.target.value)}
          className="p-2 border border-gray-300 mr-2"
          placeholder="Enter data"
        />
        <input type="file" onChange={handleImageChange} className="p-2 mr-2" />
        {previewImage && (
          <div className="mr-2">
            <img src={previewImage} alt="preview" className="w-32 h-32 object-contain" />
          </div>
        )}
        <div>
          <button onClick={handleAdd} className="mr-2 p-2 bg-green-500 text-white">Add</button>
          <button onClick={handleUpdate} className="p-2 bg-blue-500 text-white">Update</button>
        </div>
        <div className="ml-4">
          <p>Add Count: {count?.addCount || 0}</p>
          <p>Update Count: {count?.updateCount || 0}</p>
        </div>
      </div>
      <div className="flex flex-row p-4 bg-gray-400 shadow-xl items-center border-2 border-red-950 rounded-md">
        <input
          type="text"
          value={text.text1}
          onChange={(e) => setText({ ...text, text1: e.target.value })}
          className="p-2 border border-gray-300 mr-2"
          placeholder="Text for Window 1"
        />
        <input
          type="text"
          value={text.text2}
          onChange={(e) => setText({ ...text, text2: e.target.value })}
          className="p-2 border border-gray-300 mr-2"
          placeholder="Text for Window 2"
        />
        <input
          type="text"
          value={text.text3}
          onChange={(e) => setText({ ...text, text3: e.target.value })}
          className="p-2 border border-gray-300 mr-2"
          placeholder="Text for Window 3"
        />
      </div>
      <div className="flex flex-row w-51rem h-65">
        <div
          ref={refLeftBox}
          className="relative overflow-hidden w-190px h-72 m-2 border-2 border-red-500 rounded-md"
          style={{
            backgroundImage: "url('../1.jpg')",
            backgroundSize: "cover",
          }}
        >
          <div className="resizer resizer-l" ref={refLeft}></div>
          <div className="resizer resizer-t" ref={refTop}></div>
          <div className="resizer resizer-r" ref={refRight}></div>
          <div className="resizer resizer-b" ref={refBottom}></div>
        </div>
        <div
          ref={refCenterBox}
          className="relative overflow-hidden w-626px h-72 m-2 border-2 border-red-500 rounded-md"
          style={{
            backgroundImage: "url('../2.jpg')",
            backgroundSize: "cover",
          }}
        >
          <div className="resizer resizer-l" ref={refLeft2}></div>
          <div className="resizer resizer-t" ref={refTop2}></div>
          <div className="resizer resizer-r" ref={refRight2}></div>
          <div className="resizer resizer-b" ref={refBottom2}></div>
        </div>
      </div>
      <div className="flex flex-row w-51rem h-40">
        <div
          ref={refRightBox}
          className=" flex flex-row relative overflow-hidden w-810px h-36 border-2 border-red-500 rounded-md"
          style={{
            backgroundImage: "url('../3.jpg')",
            backgroundSize: "cover",
          }}
        >
          <div className="resizer resizer-l" ref={refLeft3}></div>
          <div className="resizer resizer-t" ref={refTop3}></div>
          <div className="resizer resizer-r" ref={refRight3}></div>
          <div className="resizer resizer-b" ref={refBottom3}></div>
        </div>
      </div>
    </div>
  );
}

export default App;
