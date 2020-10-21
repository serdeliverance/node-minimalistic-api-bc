#!/bin/bash

echo "----factorialCalculator.sh-----"

echo "calculating factorial of $1"

counter=$1 #first argument
factorial=1
while [ $counter -gt 0 ] #while counter > 0
do
   factorial=$(( $factorial * $counter ))
   counter=$(( $counter - 1 ))
done

# creating output directory if not exists
[ ! -d "./files" ] && mkdir files

echo "saving result in files directory"

echo $factorial >> files/factorial.txt