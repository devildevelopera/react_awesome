import React from 'react';
import styled from "styled-components";
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import { Button, TextField, FormControl, Select, InputLabel }from '@material-ui/core';
import PageWrapper from '../ui/PageWrapper';
import Paper from '@material-ui/core/Paper';

const Wrapper = styled.div `
  padding: 40px;
  min-height: 100vh;
  @media (max-width: 650px) {
    padding: 20px;
  }
`;

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(3),
  },
}));

function getSteps() {
  return ['Name & Category & Description', 'Product Variations', 'Price & Quantity', 'Photos'];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return <div>
                <TextField
                  label="Product Name"
                  margin="normal"
                  fullWidth
                />
                <FormControl
                    fullWidth
                    margin="normal"
                    className="mt-2"
                >
                    <InputLabel htmlFor="country-native-required">Category</InputLabel>
                    <Select
                        label="Country"
                        native
                        name="country"
                    >
                        <option value="" />
                        <option value = {0}>Consumer Electronics</option>
                        <option value = {0}>Sports & Health</option>
                        <option value = {0}>Babies & Toys</option>
                        <option value = {0}>Groceries & Pets</option>
                        <option value = {0}>Home & Lifestyle</option>
                        <option value = {0}>Women's Fashion</option>
                        <option value = {0}>Men's Fashion</option>
                        <option value = {0}>Watches & Accessories</option>
                        <option value = {0}>Automotive & Motorbike</option>
                    </Select>
                </FormControl>
                <TextField
                  label="Product Description (optional)"
                  multiline={true}
                  rows="4"
                  className="mt-2 mb-2"
                  fullWidth
                />
              </div>;
    case 1:
      return  <div>
                  <div>
                    <TextField
                      label="Variant Type (i.e. Size)"
                      style={{ width: "250px" }}
                      margin="normal"
                    />
                  </div>
                <TextField
                  label="Options (i.e. Medium)"
                  margin="normal"
                  style={{ width: "250px" }}
                />
                <Button
                  variant="outlined" color="secondary" size="small"
                  style={{ verticalAlign: "bottom", margin: "0 0 10px 40px" }}
                >
                  Add
                </Button>
              </div>
    case 2:
      return <div>
                  <div>
                    <TextField
                      type="number"
                      label="Price"
                      style={{ width: "250px" }}
                      margin="normal"
                    />
                  </div>
                  <div>
                    <TextField
                      type="number"
                      label="Quantity"
                      style={{ width: "250px" }}
                      margin="normal"
                    />
                  </div>
              </div>;
    case 3:
      return <div>
              <Button
                component="label" variant="outlined" color="secondary"
              >
                <input
                  accept="image/*"
                  type="file"
                  style={{ display: "none" }}
                />
                Upload Image
              </Button>
            </div>;
    default:
      return 'Unknown step';
  }
}

export default function VerticalLinearStepper() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <PageWrapper>
      <Paper>
        <Wrapper>
          <Stepper activeStep={activeStep} orientation="vertical">
            {steps.map((label, index) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
                <StepContent>
                  <div>{getStepContent(index)}</div>
                  <div className={classes.actionsContainer}>
                    <div>
                      <Button
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        className={classes.button}
                      >
                        Back
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleNext}
                        className={classes.button}
                      >
                        {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                      </Button>
                    </div>
                  </div>
                </StepContent>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length && (
            <Paper square elevation={0} className={classes.resetContainer}>
              <div>All steps completed - you&apos;re finished</div>
              <Button onClick={handleReset} className={classes.button}>
                Reset
              </Button>
            </Paper>
          )}
        </Wrapper>
      </Paper>
    </PageWrapper>
  );
}
