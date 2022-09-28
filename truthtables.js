
var truthtables = {
    init: () => {
        document.addEventListener('DOMContentLoaded', () => {
            truthtables.reload();  
            document.getElementById('checkTable').addEventListener('click', () => {
                truthtables.check(); 
            });
        });
    }, 

    reload: () => {
        let eq = truthtables.equations[Math.floor(Math.random() * truthtables.equations.length)];
        let matches = eq.match(/([A-Z])/g);
        let perms = product([true, false], matches.length);
        
        // Time to build the table
        let table = document.createElement('table');
        table.classList.add('table'); 
        let thead = document.createElement('thead');
        let tr = document.createElement('tr');
        for (let i = 0; i < matches.length; i++) {
            let th = document.createElement('th');
            th.innerHTML = matches[i];
            tr.appendChild(th);
        }
        let th = document.createElement('th');
        th.innerHTML = eq;
        tr.appendChild(th);
        thead.appendChild(tr);
        table.appendChild(thead);
        
        let tbody = document.createElement('tbody');
        for (let i = 0; i < perms.length; i++) {
            let tr = document.createElement('tr');
            for (let j = 0; j < perms[i].length; j++) {
                let td = document.createElement('td');
                td.innerHTML = perms[i][j];
                tr.appendChild(td);
            }

            // Solution
            let tmpEqn = eq; 
            for(let k = 0; k < matches.length; k++) {
                tmpEqn = tmpEqn.replace(matches[k], perms[i][k]);
            }
            let td = document.createElement('td');
            let sel = document.createElement('select');
            let ans = eval(tmpEqn);
            sel.dataset.ans = ans ? 0 : 1; // selectedIndex of correct answer 
            sel.classList.add('form-control');
            let opt = document.createElement('option');
            opt.innerHTML = 'true';
            opt.value = 1;
            sel.appendChild(opt);
            opt = document.createElement('option');
            opt.innerHTML = 'false';
            opt.value = 0;
            sel.appendChild(opt); 
            td.appendChild(sel);
            tr.appendChild(td);
            tbody.appendChild(tr);
        }
        table.appendChild(tbody);

        document.getElementById('truthtable').innerHTML = table.outerHTML; 

        document.querySelectorAll('div#truthtable select').forEach((sel) => {
            sel.selectedIndex = -1;
            sel.addEventListener('change', (e) => {
                e.target.classList.remove('correct');
                e.target.classList.remove('incorrect');
            });
        }); 
    },

    /**
     * Check the answers
     */
    check: () => {
        document.querySelectorAll('div#truthtable select').forEach((sel) => {
            if (sel.selectedIndex == -1) {
                sel.classList.remove('incorrect');
                sel.classList.remove('correct'); 
            } else if (sel.selectedIndex == sel.dataset.ans) {
                sel.classList.remove('incorrect');
                sel.classList.add('correct');
            } else {
                sel.classList.remove('correct');
                sel.classList.add('incorrect');
            }

        });
    },

    /**
     * Long list of possible equations for the truth tables. One
     * will be randomly pulled and used each time. 
     */
    equations: [
        '!A',
        'A && B',
        'A || B',
        '!A && B',
        '!A || B',
        'A && !B',
        'A || !B',
        '!A && !B',
        '!A || !B',
        'A && B && C',
        'A && (B || C)',
        '(A && B) || C',
        'A || (B && C)',
        '(A || B) && C',
        'A || B || C',
        '!A && B && C',
        'A && !B && C',
        'A && B && !C',
        '!A && !B && C',
        '!A && B && !C',
        'A && !B && !C',
        '!A && !B && !C',
        '!A || B || C',
        'A || !B || C',
        'A || B || !C',
        '!A || !B || C',
        '!A || B || !C',
        'A || !B || !C',
        '!A || !B || !C',
        'A && ( B || C)',
        'A || ( B && C)',
        '( A && B) || C',
        '( A || B) && C',
        '( A && B) || ( C && D)',
        '( A || B) && ( C || D)',
        '( A && B) || ( C || D)',
        '( A || B) && ( C && D)',
        'A && !(B || C)',
        'A || !(B && C)',
        '!(A && B) || C',
        '!(A || B) && C',        
    ],
}

function product(iterables, repeat) {
    var argv = Array.prototype.slice.call(arguments), argc = argv.length;
    if (argc === 2 && !isNaN(argv[argc - 1])) {
        var copies = [];
      for (var i = 0; i < argv[argc - 1]; i++) {
          copies.push(argv[0].slice()); // Clone
      }
      argv = copies;
    }
    return argv.reduce(function tl(accumulator, value) {
      var tmp = [];
      accumulator.forEach(function(a0) {
        value.forEach(function(a1) {
          tmp.push(a0.concat(a1));
        });
      });
      return tmp;
    }, [[]]);
  }