const sinon = require('sinon');
const PostModel = require('../models/post.model');
const PostController = require('../controllers/post.controller');

describe('Post controller', () => {
    // Setup the responses
    let req = {
        body: {
                _id: '507asdghajsdhjgasd',
            author: 'stswenguser',
            title: 'My first test post',
            content: 'Random content'
        }
    };

    let error = new Error({ error: 'Some error message' });

    let res = {};

    let expectedResult;

    
    describe('create', () => {
        var createPostStub;

        beforeEach(() => {
            // before every test case setup first
            res = {
                json: sinon.spy(),
                status: sinon.stub().returns({ end: sinon.spy() })
            };
        });

        afterEach(() => {
            // executed after the test case
            createPostStub.restore();
        });


        it('should return the created post object', () => {
            // Arrange
            expectedResult = {
                _id: '507asdghajsdhjgasd',
                title: 'My first test post',
                content: 'Random content',
                author: 'stswenguser',
                date: Date.now()
            };

            createPostStub = sinon.stub(PostModel, 'createPost').yields(null, expectedResult);

            // Act
            PostController.create(req, res);

            // Assert
            sinon.assert.calledWith(PostModel.createPost, req.body);
            sinon.assert.calledWith(res.json, sinon.match({ title: req.body.title }));
            sinon.assert.calledWith(res.json, sinon.match({ content: req.body.content }));
            sinon.assert.calledWith(res.json, sinon.match({ author: req.body.author }));

        });


        // Error Scenario
        it('should return status 500 on server error', () => {
            // Arrange
            createPostStub = sinon.stub(PostModel, 'createPost').yields(error);

            // Act
            PostController.create(req, res);

            // Assert
            sinon.assert.calledWith(PostModel.createPost, req.body);
            sinon.assert.calledWith(res.status, 500);
            sinon.assert.calledOnce(res.status(500).end);
        });
    });

    describe('update', () => {
        let updatePostStub; // Define updatePostStub outside beforeEach
    
        beforeEach(() => {
            // Before every test case setup
            res = {
                json: sinon.spy(),
                status: sinon.stub().returnsThis(), // Ensure that status returns res
                end: sinon.spy() // Include the end method
            };            
    
            // Stub the PostModel's updatePost method
            updatePostStub = sinon.stub(PostModel, 'updatePost');
        });
    
        afterEach(() => {
            // Executed after each test case
            updatePostStub.restore();
        });
    
        it('should return the updated post object', () => {
            // Test case for successful update
            // Add your existing test case code here
        });
    
        // Error Scenario
        it('should return status 500 on server error', () => {
            // Arrange
            let postId = '507asdghajsdhjgasd';
            updatePostStub.yields(new Error('Database error')); // Stub behavior for this test case
    
            // Act
            req.params = { id: postId }; // Set request parameter
            PostController.update(req, res);
    
            // Assert
            sinon.assert.calledWith(updatePostStub, postId, req.body);
            sinon.assert.calledWith(res.status, 500);
            sinon.assert.calledOnce(res.status(500).json);
        });
    });
    

    describe('findPost', () => {
        
        var createPostStub;

        beforeEach(() => {
            // before every test case setup first
            res = {
                json: sinon.spy(),
                status: sinon.stub().returns({ end: sinon.spy() })
            };
        });

        afterEach(() => {
            // executed after the test case
            createPostStub.restore();
        });


        it('should return the created post object', () => {
            // Arrange
            expectedResult = {
                _id: '507asdghajsdhjgasd',
                title: 'My first test post',
                content: 'Random content',
                author: 'stswenguser',
                date: Date.now()
            };

            createPostStub = sinon.stub(PostModel, 'createPost').yields(null, expectedResult);

            // Act
            PostController.create(req, res);

            // Assert
            sinon.assert.calledWith(PostModel.createPost, req.body);
            sinon.assert.calledWith(res.json, sinon.match({ title: req.body.title }));
            sinon.assert.calledWith(res.json, sinon.match({ content: req.body.content }));
            sinon.assert.calledWith(res.json, sinon.match({ author: req.body.author }));

        });

        it('should return a server status of 500', () => {
            let req = {
                body: {
                    _id: '123',
                    title: 'ayyo',
                    content: 'wassup',
                    author: 'okay',
                }
            };

            findPostStub = sinon.stub(PostModel, 'findPost').yields({ status: 500 }, null);

            const statusStub = sinon.stub().returnsThis();  
            const endStub = sinon.stub();  

            const res = {
                status: statusStub,
                end: endStub,
                json: sinon.stub()
            };

            // Act
            PostController.findPost(req, res);

            // Assert
            sinon.assert.calledWith(PostModel.findPost, req.body);
            sinon.assert.calledWith(statusStub, 500);

        })
    })
});
