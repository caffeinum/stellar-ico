## Stellar ICO

### Init

    echo "KEY=SAXCEVKSHIKH3MSEK26NJ6HXBLNA5EMT7CDZIBYHHI3TLERQZ6RGGLRZ" > .env

### Run

    npm i
    node app.js

## Docker

    # build/update image
    docker build . -t stellar-ico

    # run image
    docker run --name tokensale -d -p 3000:3000 stellar-ico

    # read logs
    docker logs tokensale

## API methods

    # get my balances
    http://localhost:3000/me

    # generate account with 1.5 XLM
    http://localhost:3000/create-account?address=ADDRESS

    # check account balance
    http://localhost:3000/get-balance?address=ADDRESS

    # send tokens to account
    http://localhost:3000/mint?name=TOKEN&to=ADDRESS&amount=100

    # send XLM to account
    http://localhost:3000/send?to=ADDRESS&amount=10
