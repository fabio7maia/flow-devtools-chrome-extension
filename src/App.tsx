import React, { useEffect, useState } from "react";
import ReactJson from "react-json-view";
import JSONTree from "react-json-tree";

function App() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    (window as any).chrome.runtime.sendMessage({ type: "getData" }, (res: any) => {
      (window as any).chrome.tabs.executeScript({
        code: 'console.log("[Extension panel] New message")',
      });

      setData(res);
    });
  }, []);

  return (
    <div style={{ minWidth: "600px", backgroundColor: "moccasin" }}>
      <table>
        <tr style={{ height: "30px", borderBottom: "2px solid dimgray" }}>
          <th style={{ width: "100px" }}>Action</th>
          <th style={{ minWidth: "250px" }}>Payload</th>
          <th style={{ minWidth: "250px" }}>Flow</th>
        </tr>
        {data.map((x) => {
          return (
            <tr style={{ borderBottom: "1px solid dimgray" }}>
              <td style={{ width: "100px", padding: "5px 5px" }}>
                <b>{`${x.flow.flowName} [${x.action}]`}</b>
              </td>
              <td style={{ minWidth: "250px", backgroundColor: "rgb(29, 31, 33)", padding: "5px 5px" }}>
                <ReactJson
                  src={x.data}
                  theme="google"
                  iconStyle="circle"
                  enableClipboard={false}
                  collapsed={2}
                  displayDataTypes={false}
                  displayObjectSize
                />
              </td>
              <td style={{ minWidth: "250px", backgroundColor: "rgb(29, 31, 33)", padding: "5px 5px" }}>
                {/* <ReactJson src={x.flow} /> */}
                <ReactJson
                  src={x.flow}
                  theme="google"
                  iconStyle="circle"
                  enableClipboard={false}
                  collapsed={2}
                  displayDataTypes={false}
                  displayObjectSize
                />
                {/* <JSONTree data={x.flow} /> */}
              </td>
            </tr>
          );
        })}
      </table>
    </div>
  );
}

export default App;
