# Sign & Merge

#### Make sign for all .png files in directory.
#### Merge files __*-ch1.png__ and __*-ch2.png__ to one with both markers list.
***
## Require

[Node.js](https://nodejs.org/)
***
## Installation
Download and unzip this repository. Execute command in command line:
>npm install

Add project direcrtory to system PATH environment:
1. Copy the Directory path. To do so, select the path from the address bar and press “CTRL+C” 
![Select project folder](/images/select%20path.png)
2. Open the Environment Variables settings by typing “Environment Variables” in the “Startup” menu and selecting the “Edit environment variables for your account” option:
![Open Environment Variables](./images/Environment-Variable-in-Windows-3.png)
3. Press the “Environment Variables” button:
![Environment Variables](./images/System%20Properties.png)
4. Choose the Path option from the “System variables” panel and press the “Edit” button:
![Environment Variables](./images/Environment%20Variables.png)
5. click the “New” button to add the copied path, press “CTRL+V” to paste the directory path, and click the “OK” button:
![Environment Variables](./images/Edit%20environment%20variable.png)

## How to use

### Sign tests

1. Save scrinshots of test in path with format:
>PO#######/PN########/SN-#######

2. Open path from file explorer:
![Environment Variables](./images/Open%20path.png)
1 - PO; 2 - PN; 3 - SN.

3. Press Shift and right click mouse. Select “Open PowerShell window here”:
![Environment Variables](./images/Start-Command-line.png)
4. Type **ss** and press **Enter**:
![Environment Variables](./images/Windows%20PowerShell.png)
5. After the script print: “All images signed.”:
![Environment Variables](./images/Windows%20PowerShell%20complete.png)
Your screenshots in folder signed:
![Environment Variables](./images/Signed-test.png)

#### Restore unsigned files

Type **ss -r** and press **Enter**. Directory "source" must exist.

All __*.png__ files from "source" directory will moved to current folder.

![Environment Variables](./images/restore.png)

### Merge tests with 2 channels

Merge files __*-ch1.png__ and __*-ch2.png__ to one with both markers list.
