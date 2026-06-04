
import java.util.*;
public class MissingEleInArray {
    public static int[] findMissingEle(int[] arr,int n){
        int [] temp = new int[n+1];
        for(int i= 0 ; i<n ;i++){
            temp[arr[i]]++;
        }

        int[] result = new int [n+1];
        int index= 0 ;
        for(int i = 0 ;  i<n ;i++){
            if(temp[i] == 0 ){
                result[index] = i;
            }
            index++;
        }
        return result;
    }
    public static void main(String[] args) {
        Scanner sc= new Scanner(System.in);
        int num =  sc.nextInt();
        int []arr= new int[num];
        for(int i=0 ; i<num-1 ; i++)arr[i] = sc.nextInt();

        int [] result = findMissingEle(arr, num);
        System.out.println(Arrays.toString(result));
        sc.close();
    }
}
