npm run build
aws s3 sync dist/ s3://aws-website-bangerfm-3p7g1/ --delete
aws cloudfront create-invalidation --cli-input-json "{\"DistributionId\":\"E17TETHXN4E0OU\",\"InvalidationBatch\":{\"Paths\":{\"Quantity\":1,\"Items\":[\"/*\"]},\"CallerReference\":\"$(date +%s)\"}}"