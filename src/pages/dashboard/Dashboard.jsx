import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Button, MenuItem, Select, TextField, IconButton } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import axiosInstance from '../../utils/axios';
import Draggable from 'react-draggable';
import BarChartCom from '../../components/barChart/BarChart';
import { TableChart } from '../../components/tableData/TableChart';
import Loader from '../../components/loader/Loader';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PieChartComponent from '../../components/Pie/PieChartComponent';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const optionData = [
  { id: 1, value: 'Bar-Chart' },
  { id: 2, value: 'Table' },
  { id: 3, value: 'Pie-Chart' },
];

const Dashboard = () => {
  const [promptText, setPromptText] = useState({
    inputValue: '',
    selectedValue: '',
  });
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showLoading, setShowLoading] = useState(false);
  const [chartType, setChartType] = useState({});

  const handleInputChange = (event, name) => {
    const { value } = event.target;
    setPromptText((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    
  };

  const handleInsideSelect = (e, id) => {
    const { value } = e.target;
    setChartType((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const fetchData = async () => {
    try {
      const response = await axiosInstance.post(
        '/generate-query/',
        {
          prompt: promptText.inputValue,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      setData((prevData) => [...prevData, response.data]);
      setIsLoading(false);
    } catch (error) {
      console.error('Error:', error.response);
      toast.info(error.response.data.detail, {
        position: 'top-center',
        theme: 'colored',
        autoClose: 3000,
        transition: Bounce,
      });
      setIsLoading(false);
    }
  };

  const handlefetchData = async () => {
    setShowLoading(true);
    await fetchData();
    clearInputValue();
   
  };
  const clearInputValue = () => {
    setPromptText((prevState) => ({
      ...prevState,
      inputValue: '',
    }));
  };
  const handleDelete = (id) => {
    const updatedData = data
      .map((item) => item.filter((e) => e.uuid !== id))
      .filter((item) => item.length > 0);
    setData(updatedData);
  };
  const downloadPDF = async () => {
    const input = document.getElementById('dashboard-content');
    const canvas = await html2canvas(input);
    const imgData = canvas.toDataURL('image/png');
  
   
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    
   
    const maxImgWidth = screenWidth - 20; 
  

    const imgWidth = Math.min(210, maxImgWidth); 
    const imgHeight = canvas.height * imgWidth / canvas.width;
  
    const pdf = new jsPDF({
      orientation: 'landscape', 
      unit: 'mm', 
      format: [imgWidth, imgHeight] 
    });
  
    const marginTop = 50; 
    const marginLeft = 8; 
  
    const xPos = (pdf.internal.pageSize.getWidth() - imgWidth) / 2;
    let yPos = marginTop;
  
    pdf.addImage(imgData, 'PNG', xPos + marginLeft, yPos, imgWidth, imgHeight);
  
    let remainingHeight = pdf.internal.pageSize.getHeight() - yPos - imgHeight;
    let currentPage = 1;
  
    while (remainingHeight < 0) {
      pdf.addPage();
      currentPage++;
      yPos = marginTop - (pdf.internal.pageSize.getHeight() * (currentPage - 1));
      pdf.addImage(imgData, 'PNG', xPos + marginLeft, yPos, imgWidth, imgHeight);
      remainingHeight = pdf.internal.pageSize.getHeight() - yPos - imgHeight;
    }
  
    // Save PDF
    pdf.save('dashboard.pdf');
  };
  
  return (
    <Box>
      <ToastContainer />
      <header
        style={{
          backgroundColor: '#918e8e',
          color: '#fff',
          padding: '4px 15px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography variant="h1" fontSize={'28px'} py={2} fontWeight={600}>
          Chat - Visualization
        </Typography>
        <IconButton onClick={downloadPDF} color="inherit">
          <DownloadIcon />
        </IconButton>
      </header>
      <Box id="dashboard-content" maxWidth={'1200px'} mx={'auto'}>
        <Box
          display={'flex'}
          alignItems={'center'}
          my={4}
          width={'90%'}
          px={2}
          gap={4}
        >
          <Box width={'80%'}>
            <TextField
              id="outlined-multiline-flexible"
              label="search"
              multiline
              maxRows={4}
              name={'inputValue'}
              size="small"
              sx={{ width: '100%' }}
              value={promptText.inputValue}
              onChange={(e) => handleInputChange(e, 'inputValue')}
            />
          </Box>
          <Box>
            <Select
              sx={{ width: '200px' }}
              value={promptText.selectedValue}
              name={'selectedValue'}
              displayEmpty
              size="small"
              disabled={promptText.inputValue === ''}
              onChange={(e) => handleInputChange(e, 'selectedValue')}
            >
              <MenuItem value="" disabled>
                --- Choose Type ---
              </MenuItem>
              {optionData.map((option) => (
                <MenuItem
                  key={option.value}
                  value={option.value}
                  sx={{ width: '200px', fontSize: '14px' }}
                >
                  {option.value}
                </MenuItem>
              ))}
            </Select>
          </Box>
          <Box>
            <Button
              variant="contained"
              color="success"
              type="submit"
              disabled={
                promptText.inputValue === '' || promptText.selectedValue === ''
              }
              onClick={handlefetchData}
            >
              Search
            </Button>
          </Box>
        </Box>
        {isLoading ? (
          showLoading && <Loader />
        ) : (
          <Box display={'flex'} flexWrap={'wrap'} gap={4}>
            {data.map((item, index) => (
              <Box key={index}>
                {item.map((innerItem, innerIndex) => (
                  <Draggable
                    key={innerIndex}
                    axis="both"
                    handle=".handle"
                    defaultPosition={{ x: 0, y: 0 }}
                    position={null}
                    scale={1}
                  >
                    <Box className="handle">
                      {promptText.selectedValue === 'Pie-Chart' ||
                      chartType[innerItem.uuid] === 'Pie-Chart' ? (
                        <PieChartComponent
                          data={innerItem}
                          key={innerIndex}
                          id={innerItem.uuid}
                          handleDelete={handleDelete}
                          handleInsideSelect={handleInsideSelect}
                          optionData={optionData}
                          chartType={chartType[innerItem.uuid]}
                        />
                      ) : (promptText.selectedValue === 'Bar-Chart' ||
                          chartType[innerItem.uuid] === 'Bar-Chart') ? (
                        <BarChartCom
                          data={innerItem}
                          id={innerItem.uuid}
                          handleDelete={handleDelete}
                          handleInsideSelect={handleInsideSelect}
                          optionData={optionData}
                          chartType={chartType[innerItem.uuid]}
                        />
                      ) : (
                        (promptText.selectedValue === 'Table' ||
                          chartType[innerItem.uuid] === 'Table') && (
                          Object.keys(innerItem).map((key) => {
                            if (key !== 'uuid') {
                              return (
                                <Box
                                  key={key}
                                  my={4}
                                  maxWidth={'1200px'}
                                  mx={'auto'}
                                >
                                  <Typography
                                    variant="h2"
                                    fontSize={'24px'}
                                    fontWeight={'600'}
                                    pb={2}
                                  >
                                    {key}
                                  </Typography>
                                  <TableChart
                                    userData={innerItem[key]}
                                    id={innerItem.uuid}
                                    handleDelete={handleDelete}
                                    handleInsideSelect={handleInsideSelect}
                                    optionData={optionData}
                                    chartType={chartType[innerItem.uuid]}
                                  />
                                </Box>
                              );
                            }
                            return null;
                          })
                        )
                      )}
                    </Box>
                  </Draggable>
                ))}
              </Box>
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Dashboard;
