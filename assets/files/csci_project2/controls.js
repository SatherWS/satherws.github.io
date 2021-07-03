/* start of UI code for displaying user input */
var togs = true;
var scheme = document.getElementById("scheme_input");
var scheme_lable = document.getElementById("scheme");

function changeScheme() {
    togs = !togs;
    if (togs) {
        scheme_lable.innerHTML = "Fixed";
        scheme.value = "Fixed";
        document.getElementById("p_sizes").style.display = "block";
        document.getElementById("d_size").style.display = "None";
    }
    else {
        scheme_lable.innerHTML = "Dynamic";
        scheme.value = "Dynamic";
        //document.getElementById("d_size").style.display = "block";
        //document.getElementById("p_sizes").style.display = "none";
    }
}

function addSlots() {
    var p_sizes = document.getElementById("p_sizes").value;
    var j_sizes = document.getElementById("j_sizes").value;

    if (p_sizes != "" && j_sizes != "") {
        var header1 = document.createElement("P");
        var header2 = document.createElement("P");
        header1.innerHTML = "Partitions";
        header2.innerHTML = "Jobs";

        document.getElementById("partitions").appendChild(header1);
        document.getElementById("jobs").appendChild(header2);

        p_sizes = p_sizes.split(" ");
        j_sizes = j_sizes.split(" ");

        for (var i = 0; i < p_sizes.length; i++) {
            var new_div = document.createElement("DIV");
            new_div.innerHTML = p_sizes[i];
            new_div.className = "block-style";
            document.getElementById("partitions").appendChild(new_div);
        }

        for (var i = 0; i < j_sizes.length; i++) {
            var new_div = document.createElement("DIV");
            new_div.innerHTML = j_sizes[i];
            new_div.className = "block-style";
            document.getElementById("jobs").appendChild(new_div);
        }

        // shows either results table 2.1 or 2.2
        showResults(p_sizes, j_sizes);
    }
}

function showResults(p_sizes, j_sizes) {
    // temp p and j arrays, TODO: make them instance variables instead
    var p_sizes = document.getElementById("p_sizes").value;
    var j_sizes = document.getElementById("j_sizes").value;
    p_sizes = p_sizes.split(" ");
    j_sizes = j_sizes.split(" ");

    var algs = document.getElementsByName("alg1");

    if (scheme.value == "Fixed") {
        // display table 2.1 from page 35
        var results_table = document.getElementById("fixed-area");
        results_table.style.display = "block";

        for (var i = 0; i < algs.length; i++) {
            if (algs[i].checked) {
                if (algs[i].value == "first-fit")
                    fixedFirstFit(p_sizes, j_sizes);
                else if (algs[i].value == "best-fit")
                    fixedBestFit(p_sizes, j_sizes);
                else if (algs[i].value == "next-fit")
                    fixedNextFit(p_sizes, j_sizes);
                else if (algs[i].value == "worst-fit")
                    fixedWorstFit(p_sizes, j_sizes);
                break;
            }
        }
    }
    else if (scheme.value == "Dynamic") {
        // display table 2.2 from page 41
        var results_table = document.getElementById("dynamic-area");
        results_table.style.display = "block";

        for (var i = 0; i < algs.length; i++) {
            if (algs[i].checked) {
                if (algs[i].value == "first-fit")
                    dynamicFirstFit(p_sizes, j_sizes);
                else if (algs[i].value == "best-fit")
                    dynamicBestFit(p_sizes, j_sizes);
                else if (algs[i].value == "next-fit")
                    dynamicNextFit(p_sizes, j_sizes);
                else if (algs[i].value == "worst-fit")
                    dynamicWorstFit(p_sizes, j_sizes);
                break;
            }
        }
    }
}

// simple page refresh to clear i/o data
function clearSlots() {
    location.reload();
}