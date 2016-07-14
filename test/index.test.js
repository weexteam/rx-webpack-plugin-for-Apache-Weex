import expect from "expect";
import path from "path";
import Plugin from "../src/index";

describe('.constructor', () => {

    beforeEach(function() {
        this.plugin = new Plugin();
    });


    describe(".constructor", function() {
        it("should not have .options set", function() {
            expect(this.plugin.options).toBeA("object");
        });

    });

    describe(".apply", function() {
        beforeEach(function() {
            this.compiler = {
                plugin: expect.createSpy(),
            };

            this.plugin.apply(this.compiler);
        });

        it("should add a this-compilation hook", function() {

            expect(this.compiler.plugin).toHaveBeenCalled();
            expect(this.compiler.plugin.calls[0].arguments[0]).toEqual("this-compilation");
        });

        it("should add a compile hook", function() {
            expect(this.compiler.plugin).toHaveBeenCalled();
            expect(this.compiler.plugin.calls[1].arguments[0]).toEqual("compile");
        });
    });

    context("when this-compilation is fired", function() {
        //TODO
    });

});
