/*
* FILENAME: algorithms.js
*
* DESCRIPTION :
*       Script for implementing BestFit, FirstFit, NextFit, and WorstFit using fixed and dynamic partition memory types.
*
* NOTES:
*       Fixed algorithms on lines 15 through 369
*           - First fit on lines 15 through 98
*           - Best fit on lines 103 through 194
*           - Next fit on lines 197 through 284
*           - Worst fit on lines 288 through 373
*
*       Dynamic algorithms on lines 384 through 619
*           - First fit on lines 384 through 434
*           - Best fit on lines 437 through 495
*           - Next fit on lines 498 through 559
*           - Worst fit on lines 562 through 619
*
* AUTHOR: Colin Sather 
*/

/* Fixed partition algorithms section start */

function fixedFirstFit(partitions, jobs) {
    /*  Understanding Operating Systems page 41 */
    var outputPage = document.getElementById("fixed-area");
    var h3 = document.createElement("H3");
    h3.innerHTML = "First Fit Results | Fixed Partitions";
    outputPage.appendChild(h3);
    var allocations = [];
    var busy = [];
    var fragmentation = 0;

    // Initially no blocks are assigned to any process
    for (var i = 0; i < partitions.length; i++) {
        allocations[i] = partitions[i];
    }

    for (var i = 0; i < jobs.length; i++) {
        var table_x = document.createElement("TABLE");
        var heading = table_x.insertRow(0);
        var th1 = heading.insertCell(0);
        var th2 = heading.insertCell(1);
        var th3 = heading.insertCell(2);
        var th4 = heading.insertCell(3);

        th1.innerHTML = "Partition Size";
        th2.innerHTML = "Memory Address"
        th3.innerHTML = "Access";
        th4.innerHTML = "Partition Status";

        for (var j = 0; j < partitions.length; j++) {
            if (partitions[j] >= jobs[i]) {
                fragmentation += (partitions[j] - jobs[i]);
                busy.push(partitions[j], i);
                partitions[j] = 0;
                var memoryAddress = 0;

                for (var k = 0; k < partitions.length; k++) {
                    var row = table_x.insertRow(-1);
                    var cell1 = row.insertCell(0);
                    var cell2 = row.insertCell(1);
                    var cell3 = row.insertCell(2);
                    var cell4 = row.insertCell(3);
                    
                    memoryAddress += allocations[k];
                    
                    if (partitions[k] === 0) {
                        if (busy.length !== 2) {
                            for (var l = 0; l < busy.length; l += 2) {
                                if (allocations[k] === busy[l]) {
                                    cell1.innerHTML = allocations[k];
                                    cell2.innerHTML = memoryAddress;
                                    cell3.innerHTML =  "Job "+busy[(l + 1)];
                                    cell4.innerHTML =  "Busy";
                                }
                            }
                        } 
                        else {
                            cell1.innerHTML = allocations[k];
                            cell2.innerHTML = memoryAddress;
                            cell3.innerHTML = "Job "+i;
                            cell4.innerHTML = "Busy";
                        }
                    } 
                    else {
                        cell1.innerHTML = allocations[k];
                        cell2.innerHTML = memoryAddress;
                        cell3.innerHTML = "";
                        cell4.innerHTML = "Free";
                    }
                }
                break;
            }
        }
        outputPage.appendChild(table_x);
        var label = document.createElement("DIV");
        label.className = "flex-area";
        var p1 = document.createElement("P");
        var p2 = document.createElement("P");
        p1.innerHTML = "Job " + i + " loaded";
        p2.innerHTML = "Total fragmentation: "+fragmentation;
        label.appendChild(p1);
        label.appendChild(p2);
        outputPage.appendChild(label);
    }
}


function fixedBestFit(partitions, jobs) {
    var outputPage = document.getElementById("fixed-area");
    var h3 = document.createElement("H3");
    h3.innerHTML = "Best Fit Results | Fixed Partitions";
    outputPage.appendChild(h3);
    var allocations = [], busy = [];
    var tempFragmentation = 0, fragmentation = 0, freePos = 0;
    var matched = false;
    for (var i = 0; i < partitions.length; i++) { 
        allocations[i] = partitions[i]; 
    }

    for (i = 0; i < jobs.length; i++) {
        var table_x = document.createElement("TABLE");
        var heading = table_x.insertRow(0);
        var th1 = heading.insertCell(0);
        var th2 = heading.insertCell(1);
        var th3 = heading.insertCell(2);
        var th4 = heading.insertCell(3);

        th1.innerHTML = "Partition Size";
        th2.innerHTML = "Memory Address"
        th3.innerHTML = "Access";
        th4.innerHTML = "Partition Status";

        var memoryAddress = 0;
        for (var j = 0; j < partitions.length; j++) {
            if (partitions[j] >= jobs[i]) {
                if (!matched) { 
                    freePos = j; matched = true; 
                }
                else if (partitions[freePos] > partitions[j]) { 
                    freePos = j; matched = true; 
                }
                else if (tempFragmentation >= (partitions[j] - jobs[i])) { 
                    freePos = j; matched = true; 
                }
            }
        }
        if (matched) {
            fragmentation += (partitions[freePos] - jobs[i]);
            busy.push(partitions[freePos], i);
            partitions[freePos] = 0;
        }
        matched = false;

        for (var r = 0; r < partitions.length; r++) {
            memoryAddress += allocations[r];

            var row = table_x.insertRow(-1);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            var cell3 = row.insertCell(2);
            var cell4 = row.insertCell(3);

            if (partitions[r] === 0) {
                if (busy.length !== 2) {
                    for (var l = 0; l < busy.length; l += 2) {
                        if (allocations[r] === busy[l]) {
                            cell1.innerHTML = allocations[r];
                            cell2.innerHTML = memoryAddress;
                            cell3.innerHTML =  "Job "+busy[(l + 1)];
                            cell4.innerHTML =  "Busy";
                        }
                    }
                } 
                else {
                    cell1.innerHTML = allocations[r];
                    cell2.innerHTML = memoryAddress;
                    cell3.innerHTML =  "Job "+i;
                    cell4.innerHTML =  "Busy";
                }
            } 
            else {
                cell1.innerHTML = allocations[r];
                cell2.innerHTML = memoryAddress;
                cell3.innerHTML =  " ";
                cell4.innerHTML =  "Free";
            }
        }
        outputPage.appendChild(table_x);
        var label = document.createElement("DIV");
        label.className = "flex-area";
        var p1 = document.createElement("P");
        var p2 = document.createElement("P");
        p1.innerHTML = "Job " + i + " loaded";
        p2.innerHTML = "Total fragmentation: "+fragmentation;
        label.appendChild(p1);
        label.appendChild(p2);
        outputPage.appendChild(label);
    }
}


function fixedNextFit(partitions, jobs) {
    var outputPage = document.getElementById("fixed-area");
    var h3 = document.createElement("H3");
    h3.innerHTML = "Next Fit Results | Fixed Partitions";
    outputPage.appendChild(h3);
    var allocations = [], busy = [];
    var fragmentation = 0, position = 0, zPosition = 0;
    for (var i = 0; i < partitions.length; i++) { 
        allocations[i] = partitions[i]; 
    }

    for (var i = 0; i < jobs.length; i++) {
        var table_x = document.createElement("TABLE");
        var heading = table_x.insertRow(0);
        var th1 = heading.insertCell(0);
        var th2 = heading.insertCell(1);
        var th3 = heading.insertCell(2);
        var th4 = heading.insertCell(3);

        th1.innerHTML = "Partition Size";
        th2.innerHTML = "Memory Address"
        th3.innerHTML = "Access";
        th4.innerHTML = "Partition Status";

        for (var j = position; j < partitions.length; j++) {
            zPosition = j;
            if (partitions[j] >= jobs[i]) {
                fragmentation += (partitions[j] - jobs[i]);
                busy.push(partitions[j], i);
                partitions[j] = 0;
                break;
            }
        }
        if (position === partitions.length) {
            for (var k = 0; k < zPosition; k++) {
                fragmentation += (partitions[k] - jobs[i]);
                busy.push(partitions[k], i);
                partitions[k] = 0;
                break;
            }
        }
    }

    var memoryAddress = 0;
    for (i = 0; i < partitions.length; i++) {
        memoryAddress += allocations[i];

        var row = table_x.insertRow(-1);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);

        if (partitions[i] === 0) {
            if (busy.length !== 2) {
                for (var l = 0; l < busy.length; l += 2) {
                    if (allocations[i] === busy[l]) {
                        cell1.innerHTML = allocations[i];
                        cell2.innerHTML = memoryAddress;
                        cell3.innerHTML =  "Job "+busy[(l + 1)];
                        cell4.innerHTML =  "Busy";
                    }
                }
            } 
            else {
                cell1.innerHTML = allocations[i];
                cell2.innerHTML = memoryAddress;
                cell3.innerHTML =  "Job "+i;
                cell4.innerHTML =  "Busy";
            }
        } 
        else {
            cell1.innerHTML = allocations[i];
            cell2.innerHTML = memoryAddress;
            cell3.innerHTML =  " ";
            cell4.innerHTML =  "Free";
        }
        outputPage.appendChild(table_x);
        var label = document.createElement("DIV");
        label.className = "flex-area";
        var p1 = document.createElement("P");
        var p2 = document.createElement("P");
        p1.innerHTML = "Job " + i + " loaded";
        p2.innerHTML = "Total fragmentation: "+fragmentation;
        label.appendChild(p1);
        label.appendChild(p2);
        outputPage.appendChild(label);
    }
}


function fixedWorstFit(partitions, jobs) {
    var outputPage = document.getElementById("fixed-area");
    var h3 = document.createElement("H3");
    h3.innerHTML = "Worst Fit Results | Fixed Partitions";
    outputPage.appendChild(h3);

    var allocations = [], busy = [];
    var tempFrag = 0, fragmentation = 0, freePos = 0;
    var matchFound = false;
    for (var i = 0; i < partitions.length; i++) { 
        allocations[i] = partitions[i]; 
    }

    for (var i = 0; i < jobs.length; i ++) {
        var table_x = document.createElement("TABLE");
        var heading = table_x.insertRow(0);
        var th1 = heading.insertCell(0);
        var th2 = heading.insertCell(1);
        var th3 = heading.insertCell(2);
        var th4 = heading.insertCell(3);

        th1.innerHTML = "Partition Size";
        th2.innerHTML = "Memory Address"
        th3.innerHTML = "Access";
        th4.innerHTML = "Partition Status";

        for (var z = 0; z < partitions.length; z++) {
            if (partitions[z] >= jobs[i]) {
                if (tempFrag <= (partitions[z] - jobs[i])) {
                    freePos = z;
                    matchFound = true;
                }
            }
        }
        if (matchFound === true) {
            fragmentation = fragmentation + (partitions[freePos] - jobs[i]);
            busy.push(partitions[freePos], i);
            partitions[freePos] = 0;
        }
        matchFound = false;
    }
    var memoryAddress = 0;
    for (i = 0; i < partitions.length; i++) {
        memoryAddress = memoryAddress + allocations[i];

        var row = table_x.insertRow(-1);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);

        if (partitions[i] === 0) {
            if (busy.length !== 2) {
                for (var l = 0; l < busy.length; l += 2) {
                    if (allocations[i] === busy[l]) {
                        cell1.innerHTML = allocations[i];
                        cell2.innerHTML = memoryAddress;
                        cell3.innerHTML =  "Job "+busy[(l + 1)];
                        cell4.innerHTML =  "Busy";
                    }
                }
            } 
            else {
                cell1.innerHTML = allocations[i];
                cell2.innerHTML = memoryAddress;
                cell3.innerHTML =  "Job "+i;
                cell4.innerHTML =  "Busy";
            }
        } 
        else {
            cell1.innerHTML = allocations[i];
            cell2.innerHTML = memoryAddress;
            cell3.innerHTML =  " ";
            cell4.innerHTML =  "Free";
        }
        outputPage.appendChild(table_x);
        var label = document.createElement("DIV");
        label.className = "flex-area";
        var p1 = document.createElement("P");
        var p2 = document.createElement("P");
        p1.innerHTML = "Job " + i + " loaded";
        p2.innerHTML = "Total fragmentation: "+fragmentation;
        label.appendChild(p1);
        label.appendChild(p2);
        outputPage.appendChild(label);
    }
}

/* dynamic partitions start */

function dynamicBestFit(partitions, jobs) {
    var outputPage = document.getElementById("fixed-area");
    var h3 = document.createElement("H3");
    h3.innerHTML = "Best Fit Results | Dynamic Partitions";
    outputPage.appendChild(h3);
    var allocations = [], busy = [];
    var tempFragmentation = 0, fragmentation = 0, freePos = 0;
    var matched = false;
    for (var i = 0; i < partitions.length; i++) { 
        allocations[i] = partitions[i]; 
    }

    for (i = 0; i < jobs.length; i++) {
        var table_x = document.createElement("TABLE");
        var heading = table_x.insertRow(0);
        var th1 = heading.insertCell(0);
        var th2 = heading.insertCell(1);
        var th3 = heading.insertCell(2);
        var th4 = heading.insertCell(3);

        th1.innerHTML = "Partition Size";
        th2.innerHTML = "Memory Address"
        th3.innerHTML = "Access";
        th4.innerHTML = "Partition Status";

        var memoryAddress = 0;
        for (var j = 0; j < partitions.length; j++) {
            if (partitions[j] >= jobs[i]) {
                if (!matched) { 
                    freePos = j; matched = true; 
                }
                else if (partitions[freePos] > partitions[j]) { 
                    freePos = j; matched = true; 
                }
                else if (tempFragmentation >= (partitions[j] - jobs[i])) { 
                    freePos = j; matched = true; 
                }
            }
        }
        if (matched) {
            fragmentation += (partitions[freePos] - jobs[i]);
            busy.push(partitions[freePos], i);
            partitions[freePos] = 0;
        }
        matched = false;

        for (var r = 0; r < partitions.length; r++) {
            memoryAddress += allocations[r];

            var row = table_x.insertRow(-1);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            var cell3 = row.insertCell(2);
            var cell4 = row.insertCell(3);

            if (partitions[r] === 0) {
                if (busy.length !== 2) {
                    for (var l = 0; l < busy.length; l += 2) {
                        if (allocations[r] === busy[l]) {
                            cell1.innerHTML = allocations[r];
                            cell2.innerHTML = memoryAddress;
                            cell3.innerHTML =  "Job "+busy[(l + 1)];
                            cell4.innerHTML =  "Busy";
                        }
                    }
                } 
                else {
                    cell1.innerHTML = allocations[r];
                    cell2.innerHTML = memoryAddress;
                    cell3.innerHTML =  "Job "+i;
                    cell4.innerHTML =  "Busy";
                }
            } 
            else {
                cell1.innerHTML = allocations[r];
                cell2.innerHTML = memoryAddress;
                cell3.innerHTML =  " ";
                cell4.innerHTML =  "Free";
            }
        }
        outputPage.appendChild(table_x);
        var label = document.createElement("DIV");
        label.className = "flex-area";
        var p1 = document.createElement("P");
        var p2 = document.createElement("P");
        p1.innerHTML = "Job " + i + " loaded";
        p2.innerHTML = "Total fragmentation: "+fragmentation;
        label.appendChild(p1);
        label.appendChild(p2);
        outputPage.appendChild(label);
    }
}


function dynamicNextFit(partitions, jobs) {
    var outputPage = document.getElementById("fixed-area");
    var h3 = document.createElement("H3");
    h3.innerHTML = "Next Fit Results | Dynamic Partitions";
    outputPage.appendChild(h3);
    var allocations = [], busy = [];
    var fragmentation = 0, position = 0, zPosition = 0;
    for (var i = 0; i < partitions.length; i++) { 
        allocations[i] = partitions[i]; 
    }

    for (var i = 0; i < jobs.length; i++) {
        var table_x = document.createElement("TABLE");
        var heading = table_x.insertRow(0);
        var th1 = heading.insertCell(0);
        var th2 = heading.insertCell(1);
        var th3 = heading.insertCell(2);
        var th4 = heading.insertCell(3);

        th1.innerHTML = "Partition Size";
        th2.innerHTML = "Memory Address"
        th3.innerHTML = "Access";
        th4.innerHTML = "Partition Status";

        for (var j = position; j < partitions.length; j++) {
            zPosition = j;
            if (partitions[j] >= jobs[i]) {
                fragmentation += (partitions[j] - jobs[i]);
                busy.push(partitions[j], i);
                partitions[j] = 0;
                break;
            }
        }
        if (position === partitions.length) {
            for (var k = 0; k < zPosition; k++) {
                fragmentation += (partitions[k] - jobs[i]);
                busy.push(partitions[k], i);
                partitions[k] = 0;
                break;
            }
        }
    }

    var memoryAddress = 0;
    for (i = 0; i < partitions.length; i++) {
        memoryAddress += allocations[i];

        var row = table_x.insertRow(-1);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);

        if (partitions[i] === 0) {
            if (busy.length !== 2) {
                for (var l = 0; l < busy.length; l += 2) {
                    if (allocations[i] === busy[l]) {
                        cell1.innerHTML = allocations[i];
                        cell2.innerHTML = memoryAddress;
                        cell3.innerHTML =  "Job "+busy[(l + 1)];
                        cell4.innerHTML =  "Busy";
                    }
                }
            } 
            else {
                cell1.innerHTML = allocations[i];
                cell2.innerHTML = memoryAddress;
                cell3.innerHTML =  "Job "+i;
                cell4.innerHTML =  "Busy";
            }
        } 
        else {
            cell1.innerHTML = allocations[i];
            cell2.innerHTML = memoryAddress;
            cell3.innerHTML =  " ";
            cell4.innerHTML =  "Free";
        }
        outputPage.appendChild(table_x);
        var label = document.createElement("DIV");
        label.className = "flex-area";
        var p1 = document.createElement("P");
        var p2 = document.createElement("P");
        p1.innerHTML = "Job " + i + " loaded";
        p2.innerHTML = "Total fragmentation: "+fragmentation;
        label.appendChild(p1);
        label.appendChild(p2);
        outputPage.appendChild(label);
    }
}


function dynamicWorstFit(partitions, jobs) {
    var outputPage = document.getElementById("fixed-area");
    var h3 = document.createElement("H3");
    h3.innerHTML = "Worst Fit Results | Dynamic Partitions";
    outputPage.appendChild(h3);

    var allocations = [], busy = [];
    var tempFrag = 0, fragmentation = 0, freePos = 0;
    var matchFound = false;
    for (var i = 0; i < partitions.length; i++) { 
        allocations[i] = partitions[i]; 
    }

    for (var i = 0; i < jobs.length; i ++) {
        var table_x = document.createElement("TABLE");
        var heading = table_x.insertRow(0);
        var th1 = heading.insertCell(0);
        var th2 = heading.insertCell(1);
        var th3 = heading.insertCell(2);
        var th4 = heading.insertCell(3);

        th1.innerHTML = "Partition Size";
        th2.innerHTML = "Memory Address"
        th3.innerHTML = "Access";
        th4.innerHTML = "Partition Status";

        for (var z = 0; z < partitions.length; z++) {
            if (partitions[z] >= jobs[i]) {
                if (tempFrag <= (partitions[z] - jobs[i])) {
                    freePos = z;
                    matchFound = true;
                }
            }
        }
        if (matchFound === true) {
            fragmentation = fragmentation + (partitions[freePos] - jobs[i]);
            busy.push(partitions[freePos], i);
            partitions[freePos] = 0;
        }
        matchFound = false;
    }
    var memoryAddress = 0;
    for (i = 0; i < partitions.length; i++) {
        memoryAddress = memoryAddress + allocations[i];

        var row = table_x.insertRow(-1);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);

        if (partitions[i] === 0) {
            if (busy.length !== 2) {
                for (var l = 0; l < busy.length; l += 2) {
                    if (allocations[i] === busy[l]) {
                        cell1.innerHTML = allocations[i];
                        cell2.innerHTML = memoryAddress;
                        cell3.innerHTML =  "Job "+busy[(l + 1)];
                        cell4.innerHTML =  "Busy";
                    }
                }
            } 
            else {
                cell1.innerHTML = allocations[i];
                cell2.innerHTML = memoryAddress;
                cell3.innerHTML =  "Job "+i;
                cell4.innerHTML =  "Busy";
            }
        } 
        else {
            cell1.innerHTML = allocations[i];
            cell2.innerHTML = memoryAddress;
            cell3.innerHTML =  " ";
            cell4.innerHTML =  "Free";
        }
        outputPage.appendChild(table_x);
        var label = document.createElement("DIV");
        label.className = "flex-area";
        var p1 = document.createElement("P");
        var p2 = document.createElement("P");
        p1.innerHTML = "Job " + i + " loaded";
        p2.innerHTML = "Total fragmentation: "+fragmentation;
        label.appendChild(p1);
        label.appendChild(p2);
        outputPage.appendChild(label);
    }
}

/* Dynamic partition first fit algorithm section start  */

function dynamicFirstFit(partitions, jobs) {
    var outputPage = document.getElementById("before-request");
    var outputPageHead = document.getElementById("output-head");
    var outputPage1 = document.getElementById("before-request");
    var outputPage2 = document.getElementById("after-request");
    
    var h3 = document.createElement("H3");
    h3.innerHTML = "First Fit Results | Dynamic Partitions";
    outputPageHead.appendChild(h3);

    var allocations = [];
    var busy = [];
    var fragmentation = 0;
    var dynamic_space = 0;
    for (var i = 0; i < partitions.length; i++) { 
        allocations[i] = partitions[i];
        dynamic_space = dynamic_space + partitions[i]
    }
    
    for (var i = 0; i < jobs.length; i++) {
        var table_x = document.createElement("TABLE");
        var heading = table_x.insertRow(0);
        var th1 = heading.insertCell(0);
        var th2 = heading.insertCell(1);

        var table_y = document.createElement("TABLE");
        var heading1 = table_y.insertRow(0);
        var th12 = heading1.insertCell(0);
        var th22 = heading1.insertCell(1);

        th1.innerHTML = "Beginning Address";
        th2.innerHTML = "Memory Block Size";
        th12.innerHTML = "Beginning Address";
        th22.innerHTML = "Memory Block Size";

        for (var j = 0; j < partitions.length; j++) {
            if (partitions[j] >= jobs[i]) {
        
                fragmentation += (partitions[j] - jobs[i]);
                busy.push(partitions[j], i);
                partitions[j] = 0;
                var memoryAddress = 0;

                for (var k = 0; k < partitions.length; k++) {
                    var row = table_y.insertRow(-1);
                    var cell1 = row.insertCell(0);
                    var cell2 = row.insertCell(1);

                    memoryAddress += allocations[k];
                    if (partitions[k] === 0) {
                        if (busy.length !== 2) {
                            for (var l = 0; l < busy.length; l += 2) {
                                if (allocations[k] === busy[l]) {
                                    cell1.innerHTML = memoryAddress;
                                    cell2.innerHTML = allocations[k];
                                }
                            }
                        } else {
                            cell1.innerHTML = memoryAddress;
                            cell2.innerHTML = allocations[k];
                        }
                    } 
                    else {
                        cell1.innerHTML = memoryAddress;
                        cell2.innerHTML = partitions[k];
                    }
                }
                break;
            }
        }
        outputPage2.appendChild(table_y);
        var label = document.createElement("DIV");
        label.className = "flex-area";
        var p1 = document.createElement("P");
        var p2 = document.createElement("P");
        p1.innerHTML = "Job " + i + " loaded";
        p2.innerHTML = "Total fragmentation: "+fragmentation;
        label.appendChild(p1);
        label.appendChild(p2);
        outputPage2.appendChild(label);
    }
}