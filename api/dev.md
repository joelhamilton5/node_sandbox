## Docker
run `docker-compose up` to spin up the docker image
if npm modules changed, run `docker-compose up --build -V` (--renew-anon-volumes), to re-mount node_modules volume

## AWS
**To configure AWS CLI**
run `aws configure`

**To configure the Amazon ECS CLI**

Set up a CLI profile with the following command, substituting profile_name with your desired profile name, $AWS_ACCESS_KEY_ID and $AWS_SECRET_ACCESS_KEY environment variables with your AWS credentials.

`ecs-cli configure profile --profile-name profile_name --access-key $AWS_ACCESS_KEY_ID --secret-key $AWS_SECRET_ACCESS_KEY`
Complete the configuration with the following command, substituting launch_type with the task launch type you want to use by default, region_name with your desired AWS region, cluster_name with the name of an existing Amazon ECS cluster or a new cluster to use, and configuration_name for the name you'd like to give this configuration.

`ecs-cli configure --cluster cluster_name --default-launch-type launch_type --region region_name --config-name configuration_name`
After you have installed and configured the CLI, you can try the Tutorial: Creating a Cluster with a Fargate Task Using the Amazon ECS CLI. For more information, see the Amazon ECS Command Line Reference in the Amazon Elastic Container Service Developer Guide.

### Push Docker Image
- tag image with ECR url
    - `docker images` to get image id
    - `docker tag 02d07022e43b 284901293696.dkr.ecr.us-east-2.amazonaws.com/api`
- Login (saves credentials for 12 hours)
    - `aws ecr get-login-password  --region us-east-2 | docker login --username AWS --password-stdin 284901293696.dkr.ecr.us-east-2.amazonaws.com`
- Push container
    - `docker push 284901293696.dkr.ecr.us-east-2.amazonaws.com/api`
