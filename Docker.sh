docker image build --tag fantan/local:latest -f Dockerfile .
docker run -p 8082:8082 -d fantan/local:latest
