import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'

import { BarChart, LineChart } from 'react-native-charts-wrapper'

import { fetchGraphData } from '../Services/GraphApi'

import Loader from '../Components/Loader'

const GraphScreen = () => {
  const [graphData, setGraphData] = useState([])
  const [loading, setLoading] = useState(false)
  // const [min, setMin] = useState(0)
  // const [max, setMax] = useState(0)

  useEffect(() => {
    const getData = async () => {
      setLoading(true)
      const data = await fetchGraphData()
      const testData = data.slice(0, 5)
      // console.log(testData)
      // testData.forEach(d => {
      //     console.log(new Date(d.dateReference).getTime() / 1000)
      // })
      if (testData) {
        const renderData = testData.map((i, index) => {
          console.log(i)
          const o = {
            x: index, // new Date(i.dateReference).getTime() / 1000,
            y: i.puissanceActive
          }
          console.log(o)
          return o
        })
        setGraphData(renderData)
      }
      // const max = Math.max.apply(Math, data.map(item => item.puissanceActive))
      // setMax(max)
      // const min = Math.min.apply(Math, data.map(item => item.puissanceActive))
      // setMin(min)
      setLoading(false)
    }
    getData()
  }, [])

  return (
    <View style={{ flex: 1 }}>
      {
                loading
                  ? <Loader />
                  : (
                    <View style={{ flex: 1 }}>
                      {/* <Text>Items: {graphData.length} | Min : {min} | Max : {max}</Text> */}
                      <View style={{ flex: 1 }}>
                        <View style={styles.container}>
                          <LineChart
                            style={styles.chart}
                            yAxis={{
                              left: { enabled: false },
                              right: {
                                enabled: true,
                                drawAxisLine: true,
                                drawGridLines: true
                              // labelCount: 4,
                              // labelCountForce: true,
                              }
                            }}
                            xAxis={{
                              drawAxisLines: true,
                              drawGridLines: true,
                              labelRotationAngle: 360 - 90,
                              granularityEnabled: false,
                              granularity: 1000,
                              timeUnit: 'SECONDS',
                              valueFormatter: 'date',
                              valueFormatterPattern: 'H:m',
                              position: 'BOTTOM'
                            }}
                            data={{
                              dataSets: [{
                                label: 'data',
                                values: graphData,
                                config: {
                                  barSpacePercent: 40,
                                  barWidth: 0.7
                                }
                              }],
                              config: {
                                barSpacePercent: 40,
                                barWidth: 0.7
                              }
                            }}
                          />
                          <BarChart
                            style={styles.chart}
                            legend={{
                              enabled: true,
                              textSize: 14,
                              form: 'SQUARE',
                              formSize: 14,
                              // xEntrySpace: 10,
                              // yEntrySpace: 5,
                              // formToTextSpace: 5,
                              wordWrapEnabled: true,
                              maxSizePercent: 0.5
                            }}
                            yAxis={{
                              left: { enabled: false },
                              right: {
                                enabled: true,
                                drawAxisLine: true,
                                drawGridLines: true
                              // labelCount: 4,
                              // labelCountForce: true,
                              }
                            }}
                            xAxis={{
                              drawAxisLines: true,
                              drawGridLines: true,
                              labelRotationAngle: 360 - 90,
                              granularityEnabled: false,
                              granularity: 1,
                              timeUnit: 'SECONDS',
                              valueFormatter: 'date',
                              valueFormatterPattern: 'H:m',
                              position: 'BOTTOM'
                            }}
                            marker={{
                              enabled: true
                            }}
                            data={{
                              dataSets: [{
                                label: 'data',
                                values: graphData,
                                config: {
                                  barSpacePercent: 40,
                                  barWidth: 0.7
                                }
                              }],
                              config: {
                                barSpacePercent: 40,
                                barWidth: 0.7
                              }
                            }}
                          />
                        </View>
                      </View>
                      {/* <Text>{JSON.stringify(graphData, null, 2)}</Text> */}
                    </View>
                    )

            }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF'
  },
  chart: {
    // position: 'absolute',
    // width: '100%',
    // height: '100%',
    flex: 1
  }
})

export default GraphScreen
