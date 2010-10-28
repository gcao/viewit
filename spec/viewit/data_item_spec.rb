require File.expand_path(File.dirname(__FILE__) + '/../spec_helper')

describe Viewit::DataItem do
  it "should take a hash and be able to access properties through method invocation" do
    data = Viewit::DataItem.new :a => 1
    data.a.should == 1
  end
  
  it "should take a integer" do
    data = Viewit::DataItem.new 1
    data.to_s.should == "1"
  end
  
  it "should take a string" do
    data = Viewit::DataItem.new "a String"
    data.to_s.should == "a String"
  end
  
  it "should take a nil" do
    data = Viewit::DataItem.new nil
    data.to_s.should == ""
  end
  
  it "should take an array" do
    data = Viewit::DataItem.new [1,2]
    data[0].should == 1
  end
end
