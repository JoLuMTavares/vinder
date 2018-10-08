// Displaying a random number.

console.log('Random value: ', Math.random());

// Displaying a square root of 9

console.log('Square root of 9: ', Math.sqrt(9));

// Using the sort() Method to sort the array
// alphabetically.

var fruits = ["Banana", "Orange", "Apple", "Kiwi"];

console.log('Alphabetically ordered array of fruits: ', fruits.sort());


/*

    The quicksort algorithm.
    First we have a partition function.
    This one splits the array. Then it 
    swaps the values from the two different
    partitions.

    This function is then called by the main
    one.

    The quicksort runs recursively (calling
    the partition function) until all the 
    elements are ordered.

*/

// This Lomuto partition scheme doesn't work

/*
function partition(array, low, high) {
    var pivot = array[high];
    var i = low - 1;

    for (var j = low; j < (high - 1); j++) {
        if (array[j] < pivot) {
            i++;
            array[i] = array[j];
            
        }
    }
    array[i+1] = array[high];
    return i + 1;
}

*/

// Hoare partition scheme

// Also not working

/*
function partition(array, low, high) {
    var pivot = array[low];
    i = low - 1;
    j = high + 1;
    for(;;) {
        do {
            i++;
        } while (array[i] < pivot);

        do {
            j--;
        } while (array[j] > pivot);

        if (i >= j)
            return j;
        
        array[i] = array[j];
    }
}

function quickSort(array, low, high) {
    if (low < high) {
        var p = partition(array, low, high);
        quickSort(array, low, p);
        quickSort(array, p + 1, high);
    }
    return array;
}
The result didn't come as expected. 
So now another verion is used
*/

function quickSortArray(array) {
    if (array.length <= 1)
        return array;
    else {

        var leftArr = [];
        var rightArr = [];
        var finalArr = [];

        var pivot = array.pop();
        var length = array.length;

        for (var i = 0; i < length; i++) {
            if (array[i] <= pivot)
                leftArr.push(array[i]);
            else 
                rightArr.push(array[i]);
        }

        return finalArr.concat(quickSortArray(leftArr), pivot, quickSortArray(rightArr));
    }

}

// Now testing this with the array and its values

var tArray = [29, 94, 10, 129, 39, 47, 13, 2, 7, 9, 24, 81, 90, 50, 28, 149, 201, 239, 502, 876, 736, 610, 510, 389, 222, 111, 107, 527];




/*

    Now the classical great challenge.

    ***** HEAPSORT ********

    That's right. This is the one that
    competes directly against Quicksort.


*/


// **************** First some auxiliary functions  ****************

// Parent node
function iParent(i) {
    return Math.floor((i-1)/2);
}

// Left child 
function iLeftChild(i) {
    return 2*i + 1;
}


// Right child 
function iRightChild(i) {
    return 2*i + 2;
}

// Auxiliary function to swap two values
function swap (array, pos1, pos2) {
    var temp = array[pos1];
    array[pos1] = array[pos2];
    array[pos2] = temp;
    
}

// Now the Heapify function

function heapify(array, count) {
    // (start is assigned the index in 'a' of the last parent node)
    // (the last element in a 0-based array is at index count-1; find the parent of that element)
    var start = iParent(count - 1);

    while (start >= 0) {
        // (sift down the node at index 'start' to the proper place such that all nodes below
        //  the start index are in heap order)
        siftDown(array, start, count-1);
        // (go to the next parent node)

        start--; // (after sifting down the root all nodes/elements are in heap order)

    }
}

/*
// The Heapify function with siftUp
function heapify(array, count) {
    // (end is assigned the index of the first 
    //    (left) child of the root)
    var end = 1;
    while (end < count) {
        // (sift up the node at index end to the proper place such that all nodes above
        //     the end index are in heap order)
        siftUp(array, 0, end);
        end++;
    }
}
*/
// Next is the siftDown function

function siftDown(array, start, end) {
    var root = start;
    var child;

    var swapTrack;

    // (While the root has at least one child)
    while (iLeftChild(root) < end) {
        var child = iLeftChild(root); // (Left child of root)
        swapTrack = root; // (Keeps track of child to swap with)

        if (array[swapTrack] < array[child]) 
            swapTrack = child;
        // (If there is a right child and that child is greater)
        if (((child+1) <= end) && (array[swapTrack] < array[child+1])) 
            swapTrack = child + 1;
        if (swapTrack == root) {
            // (The root holds the largest element. Since we assume the heaps rooted at the
            // children are valid, this means that we are done.)
            return;
        }
        else {
            swap(array, root, swapTrack);
            root = swapTrack; // (repeat to continue sifting down the child now)
        }
        

    }
}



function siftUp(array, start, end) {
    // start represents the limit of how far up the heap to sift.
    //                end is the node to sift up.
    var child = end;
    while (child > start) {
        var parent = iParent(child);
        if (array[parent] < array[child]) {
            // (out of max-heap order)
            swap(array, parent, child);
            child = parent; // (repeat to continue sifting up the parent now)
        }
        else    
            return;
    }
}

function heapsort(array) {
    // input: an unordered 
    // array a of length count
    var end, count = array.length;

    // (Build the heap in array a so that 
    //  largest value is at the root)
    heapify(array, count);

    // (The following loop maintains the invariants that a[0:end] is a heap and every element
    //     beyond end is greater than everything before it (so a[end:count] is in sorted order))
    end = count - 1;
    while (end > 0) {
        // (a[0] is the root and largest value. The swap moves 
        //     it in front of the sorted elements.)
        swap(array, end, 0);
        // (the heap size is reduced by one)
        end--;
        // (the swap ruined the heap property, so restore it)
        siftDown(array, 0, end);
    }
    return array;

}


// Array to be sorted
 console.log("Array to be sorted: ", tArray);

/** 
 * For unknown reasons. The Heapsort must be called first
 * Otherwise, after QuickSort execution, the Heapsort
 * gets the array with one less element.
 */

console.log("HeapSort method for the same array: ", heapsort(tArray));

console.log("QuickSort method for this array: ", quickSortArray(tArray));

