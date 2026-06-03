
import java.util.*;
public class GeometricTriplets {
     public static void findGeometricTriplets(int arr[], int n) {
        // Write code here
        for(int i=0;i<n;i++){
            for(int j=i+1;j<n;j++){
                for(int k=j+1;k<n;k++){
                    long a=arr[i];
                    long b=arr[j];
                    long c=arr[k];
                      if(b * b == a * c)
                    {
                        System.out.println(a + " " + b + " " + c);
                    }
                }
                
            }
        }
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int size = sc.nextInt();
        int [ ] arr = new int[size]; 
        for(int i=0 ; i<size ; i++)arr[i] = sc.nextInt();
        findGeometricTriplets(arr, size);
        sc.close();
    }
}
