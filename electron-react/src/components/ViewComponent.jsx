import React, { Profiler, useContext, useState, useEffect } from 'react';
import { DetailsContext } from './context/DetailsContext';
import { PerformanceContext } from './context/PerformanceContext';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';
import fetchMock from 'fetch-mock';
import stringifyObject from 'stringify-object';
import { MockFetchContext } from './context/MockFetchContext';


const ViewComponent = () => {
  const { compProps, compActions, compHTML, compState } = useContext(DetailsContext);
  const { mockServer } = useContext(MockFetchContext);
  const { performanceData } = useContext(PerformanceContext);
  const [ performanceDataArr, setPerformanceDataArr] = performanceData;
  const [ profilerData, setProfilerData ] = useState(null);

  const handleProfilerData = (id, phase, actualDuration, baseDuration, startTime, commitTime) => {
    if (phase === 'mount'){
      setProfilerData({
        id,
        phase,
        actualDuration,
        baseDuration,
        startTime,
        commitTime,
      });
    }
  };

  const updateGraph = () => {
    setPerformanceDataArr([...performanceDataArr, profilerData]);
  };

  // fetchMock.mock('*', {data: 'mock data'}, { overwriteRoutes: true });
  // React.useEffect(() => {
  // async function getData(){
  // const res = await fetch('/api/users')
  // const data = await res.json()
  // if (res.ok) console.log(data.data)
  // }
  // getData()
  // }, [])

  const string = `() => {
    ${compState[0]}
    ${compActions[0]}
    ${compProps[0]}
    ${mockServer[0]}
    return(  
    <>
      ${compHTML[0]}
    </>
    )
      }`;

  let scope = {};
  if (mockServer[0]) scope = {fetchMock};

  return (
    <div id='navigation-area'>
      {/* Actions: {stringifyObject(compActions[0])} <br/> */}
      Props: {compProps[0]} <br/>
      State: {compState[0]} <br/>
      Render Time: {profilerData ? profilerData.actualDuration.toFixed(3) + ' ms' : 'N/A'}
      <LiveProvider code= {string} scope = {scope}>
        <Profiler id = 'preview-component' onRender={handleProfilerData}>
          <LivePreview />
        </Profiler>
        <LiveError />
      </LiveProvider>
      <button onClick = {updateGraph}>Add Render Data</button>
    </div>
);
};

export default ViewComponent;