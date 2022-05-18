CONTRACTS=contracts/
if [ -d "$CONTRACTS" ]
then
    rm -rf $LOCAL
else
    mkdir $CONTRACTS
fi

cp -r ../contracts/typechain contracts/
cp ../contracts/contracts.json contracts/

echo "Contracts import successfuly!"